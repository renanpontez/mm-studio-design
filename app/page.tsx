/**
 * Homepage — fully Sanity-driven.
 *
 * Data flow:
 *   1. Fetch the `page` doc with slug=`home` from Sanity (cached + tagged for ISR).
 *   2. Fetch siteSettings in parallel (needed by ContactCTA + hero meta).
 *   3. Render via <PageBuilder> which maps each section block to its typed component.
 *
 * Fallback: if Sanity isn't configured (no projectId env), the legacy static
 * homepage at app/page.backup.tsx serves as a manual reference. To roll back
 * temporarily, rename page.backup.tsx → page.tsx.
 */
import { PageBuilder } from "@/components/page-builder/PageBuilder";
import { sanityFetch } from "@/sanity/client";
import { PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { PageDoc, SiteSettings } from "@/sanity/types";

// Render on every request and rely on the upstream Sanity CDN + our /api/revalidate
// webhook for cache invalidation. Avoids the "stale prerendered fallback" failure
// mode that bit us when the build cached a null fetch result.
export const dynamic = "force-dynamic";

async function fetchHomeData() {
  const safe = async <T,>(p: Promise<T | null>): Promise<T | null> => {
    try {
      return await p;
    } catch (err) {
      console.warn("[home] sanity fetch failed:", err);
      return null;
    }
  };
  const [home, settings] = await Promise.all([
    safe(
      sanityFetch<PageDoc | null>({
        query: PAGE_QUERY,
        params: { slug: "home" },
        tags: ["page:home"],
      })
    ),
    safe(
      sanityFetch<SiteSettings | null>({
        query: SITE_SETTINGS_QUERY,
        tags: ["settings"],
      })
    ),
  ]);
  return { home, settings };
}

export default async function HomePage() {
  const { home, settings } = await fetchHomeData();

  if (!home?.sections?.length) {
    return (
      <section className="container-edge pt-40 pb-24 min-h-[70svh] flex flex-col items-start justify-center">
        <h1 className="font-display text-4xl text-ink max-w-[20ch]">
          Homepage não encontrada no Sanity.
        </h1>
        <p className="mt-4 text-ink-2 max-w-md">
          Abra o Studio e publique uma página com slug <code>home</code>. Os
          dados ainda não chegaram ou a migração não foi executada.
        </p>
      </section>
    );
  }

  return <PageBuilder sections={home.sections} settings={settings} />;
}
