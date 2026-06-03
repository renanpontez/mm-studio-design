import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/client";
import {
  PROJECT_SLUGS_QUERY,
  SERVICE_SLUGS_QUERY,
} from "@/sanity/queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://mmstudiodesign.com.br";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, serviceSlugs] = await Promise.all([
    sanityFetch<string[]>({
      query: PROJECT_SLUGS_QUERY,
      tags: ["projects"],
    }),
    sanityFetch<string[]>({
      query: SERVICE_SLUGS_QUERY,
      tags: ["services"],
    }),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/servicos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/contato`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = (projectSlugs ?? []).map((slug) => ({
    url: `${SITE_URL}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = (serviceSlugs ?? []).map((slug) => ({
    url: `${SITE_URL}/servicos/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}
