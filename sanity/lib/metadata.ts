/**
 * Sanity → Next.js Metadata bridge.
 *
 * Resolves a final `Metadata` object from a page's `seo` field with fall-back
 * to siteSettings.defaultSeo, then to safe hard-coded defaults. Use from any
 * `generateMetadata` so every route gets a consistent OG image / title chain.
 */
import type { Metadata } from "next";
import type { Image as SanityImage } from "sanity";
import { urlFor } from "./image";

type Seo = {
  title?: string;
  description?: string;
  image?: SanityImage;
};

type SiteSettingsLike = {
  name?: string;
  tagline?: string;
  defaultSeo?: Seo;
};

const FALLBACK_TITLE = "MM Studio Design";
const FALLBACK_DESCRIPTION =
  "Estúdio de design de interiores em Fortaleza, fundado por Marly Martins e Emilly Lorrany.";

function ogImageUrl(image: SanityImage | undefined): string | undefined {
  if (!image) return undefined;
  try {
    return urlFor(image).width(1200).url() || undefined;
  } catch {
    return undefined;
  }
}

export function buildMetadata({
  pageSeo,
  pageTitle,
  settings,
  pathname,
}: {
  pageSeo?: Seo;
  pageTitle?: string;
  settings?: SiteSettingsLike | null;
  pathname?: string;
}): Metadata {
  const siteName = settings?.name ?? FALLBACK_TITLE;
  const description =
    pageSeo?.description ??
    settings?.defaultSeo?.description ??
    settings?.tagline ??
    FALLBACK_DESCRIPTION;

  const baseTitle = pageSeo?.title ?? pageTitle ?? settings?.defaultSeo?.title;
  const title = baseTitle
    ? `${baseTitle} · ${siteName}`
    : `${siteName} · ${settings?.tagline ?? "Espaços que respiram sua história"}`;

  const image =
    ogImageUrl(pageSeo?.image) ?? ogImageUrl(settings?.defaultSeo?.image);

  return {
    title,
    description,
    alternates: pathname ? { canonical: pathname } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      siteName,
      url: pathname,
      images: image ? [{ url: image, width: 1200 }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
