import { createClient, type QueryParams, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken } from "./env";

let _client: SanityClient | null = null;

function getClient(): SanityClient | null {
  // Defer construction so missing env vars don't crash module load (e.g., during
  // build collection or before initial Sanity setup).
  if (_client) return _client;
  if (!projectId || !dataset) return null;
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
  return _client;
}

export const client = {
  // exported only so existing imports compile; prefer `sanityFetch` instead.
  get instance() {
    return getClient();
  },
};

/**
 * Server-side fetch with Next 16 caching + tagging.
 * Returns `null` if Sanity isn't configured (callers should handle the fallback).
 *
 * Example:
 *   const home = await sanityFetch({ query: HOME_QUERY, tags: ["page:home"] });
 *   if (!home) return <StaticFallback />;
 */
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
  return c.fetch<T>(query, params, {
    next: { tags, revalidate: 60 * 60 },
    perspective: "published",
    token: readToken,
  });
}
