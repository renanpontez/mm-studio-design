import { createClient, type QueryParams, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken } from "./env";

let _client: SanityClient | null = null;

const isDev = process.env.NODE_ENV !== "production";
// When a read token is available, prefer the live API (CDN endpoint doesn't accept tokens
// and won't return drafts). Also disable CDN in dev so editor changes show up immediately.
const useCdn = !isDev && !readToken;
// If a token is configured we can read drafts — gives editors instant feedback on
// unpublished re-ordering. Without a token we stick to published content.
const perspective: "published" | "previewDrafts" = readToken
  ? "previewDrafts"
  : "published";
// Keep ISR window short so dragging sections in the Studio reflects on the
// site quickly even without a webhook. The /api/revalidate webhook is still
// the fast path; this is the safety net.
const revalidateSeconds = isDev ? 0 : 30;

function getClient(): SanityClient | null {
  if (_client) return _client;
  if (!projectId || !dataset) return null;
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective,
  });
  return _client;
}

export const client = {
  get instance() {
    return getClient();
  },
};

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T | null> {
  const c = getClient();
  if (!c) return null;
  // In dev: bypass Next's data cache entirely so every page render hits Sanity
  // live — section reordering in Studio shows up on next refresh, no waiting.
  // In prod: keep ISR with short revalidate + webhook invalidation.
  const fetchOptions = isDev
    ? { cache: "no-store" as const }
    : { next: { tags, revalidate: revalidateSeconds } };
  return c.fetch<T>(query, params, {
    ...fetchOptions,
    perspective,
    token: readToken,
  });
}
