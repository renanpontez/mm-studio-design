/**
 * Shared fetcher for slug-driven `page` docs. Used by every route whose body
 * is rendered by <PageBuilder /> (i.e. all routes except dynamic detail pages).
 *
 * Returns both the page and siteSettings in a single round trip so callers
 * can feed both into PageBuilder and into generateMetadata.
 */
import { sanityFetch } from "@/sanity/client";
import { PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { PageDoc, SiteSettings } from "@/sanity/types";

export async function fetchPageData(slug: string) {
  const [page, settings] = await Promise.all([
    sanityFetch<PageDoc | null>({
      query: PAGE_QUERY,
      params: { slug },
      tags: [`page:${slug}`],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ["settings"],
    }),
  ]);
  return { page, settings };
}
