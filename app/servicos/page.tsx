/**
 * /servicos — Sanity-driven, rendered via PageBuilder.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/page-builder/PageBuilder";
import { fetchPageData } from "@/sanity/lib/fetchPage";
import { buildMetadata } from "@/sanity/lib/metadata";
import { projectId } from "@/sanity/env";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { page, settings } = await fetchPageData("servicos");
  return buildMetadata({
    pageSeo: page?.seo,
    pageTitle: page?.title ?? "Serviços",
    settings,
    pathname: "/servicos",
  });
}

export default async function ServicosPage() {
  const sanityConfigured = !!projectId;
  const { page, settings } = await fetchPageData("servicos");

  if (sanityConfigured && !page?.sections?.length) {
    throw new Error(
      "[servicos] PAGE_QUERY returned no page or no sections. Publish a `page` doc with slug=servicos in Sanity, then redeploy."
    );
  }
  if (!page?.sections?.length) {
    notFound();
  }
  return <PageBuilder sections={page.sections} settings={settings} />;
}
