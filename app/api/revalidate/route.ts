import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook receiver.
 *
 * Configure in the Sanity dashboard:
 *   URL:     https://<your-domain>/api/revalidate
 *   Trigger: Create, Update, Delete
 *   Filter:  _type in ["page","project","service","founder","pillar","siteSettings","navigation"]
 *   Projection:
 *     {
 *       "_type": _type,
 *       "slug":  slug.current,
 *       "operation": delta::operation()
 *     }
 *   Secret:  paste a long random string here AND into SANITY_REVALIDATE_SECRET on Vercel.
 */
export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type?: string;
      slug?: string;
      operation?: string;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new Response("Missing body._type", { status: 400 });
    }

    const tags = new Set<string>();
    tags.add(body._type);
    if (body.slug) tags.add(`${body._type}:${body.slug}`);

    // a few high-fanout invalidations
    if (body._type === "project") tags.add("projects");
    if (body._type === "service") tags.add("services");
    if (body._type === "founder") tags.add("founders");
    if (body._type === "pillar") tags.add("pillars");
    if (body._type === "siteSettings") tags.add("settings");
    if (body._type === "navigation") tags.add("navigation");

    // Next 16 requires a cacheLife profile; "max" = expire ASAP, stale-while-revalidate
    tags.forEach((t) => revalidateTag(t, "max"));

    return Response.json({ revalidated: Array.from(tags), now: Date.now() });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(`Webhook error: ${message}`, { status: 500 });
  }
}
