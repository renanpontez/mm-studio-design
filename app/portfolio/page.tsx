/**
 * /portfolio — Sanity-driven, rendered via PageBuilder.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/page-builder/PageBuilder";
import { fetchPageData } from "@/sanity/lib/fetchPage";
import { buildMetadata } from "@/sanity/lib/metadata";
import { projectId } from "@/sanity/env";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { page, settings } = await fetchPageData("portfolio");
  return buildMetadata({
    pageSeo: page?.seo,
    pageTitle: page?.title ?? "Portfolio",
    settings,
    pathname: "/portfolio",
  });
}

export default async function PortfolioPage() {
  const sanityConfigured = !!projectId;
  const { page, settings } = await fetchPageData("portfolio");

  if (sanityConfigured && !page?.sections?.length) {
    throw new Error(
      "[portfolio] PAGE_QUERY returned no page or no sections. Publish a `page` doc with slug=portfolio in Sanity, then redeploy."
    );
  }
  if (!page?.sections?.length) {
    notFound();
  }
  return <PageBuilder sections={page.sections} settings={settings} />;
}
