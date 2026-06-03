/**
 * /sobre — Sanity-driven, rendered via PageBuilder.
 *
 * The page-doc with slug "sobre" is seeded by scripts/migrate-pages.ts. If it
 * doesn't exist in production we throw at build time (loud failure) — see
 * app/page.tsx for the same pattern.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/page-builder/PageBuilder";
import { fetchPageData } from "@/sanity/lib/fetchPage";
import { buildMetadata } from "@/sanity/lib/metadata";
import { projectId } from "@/sanity/env";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { page, settings } = await fetchPageData("sobre");
  return buildMetadata({
    pageSeo: page?.seo,
    pageTitle: page?.title ?? "Sobre",
    settings,
    pathname: "/sobre",
  });
}

export default async function SobrePage() {
  const sanityConfigured = !!projectId;
  const { page, settings } = await fetchPageData("sobre");

  if (sanityConfigured && !page?.sections?.length) {
    throw new Error(
      "[sobre] PAGE_QUERY returned no page or no sections. Publish a `page` doc with slug=sobre in Sanity, then redeploy."
    );
  }
  if (!page?.sections?.length) {
    notFound();
  }
  return <PageBuilder sections={page.sections} settings={settings} />;
}
