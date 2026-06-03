/**
 * /portfolio/[slug] — Sanity-driven project detail page.
 *
 * Static params come from PROJECT_SLUGS_QUERY; metadata + body from
 * PROJECT_DETAIL_QUERY by slug.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CTA } from "@/components/ui/CTA";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import { sanityFetch } from "@/sanity/client";
import {
  PROJECT_DETAIL_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECTS_INDEX_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/queries";
import { buildMetadata } from "@/sanity/lib/metadata";
import { urlFor } from "@/sanity/lib/image";
import type { ProjectCard, ProjectDetail, SiteSettings } from "@/sanity/types";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: PROJECT_SLUGS_QUERY,
    tags: ["projects"],
  });
  return (slugs ?? []).map((slug) => ({ slug }));
}

async function fetchData(slug: string) {
  const [project, all, settings] = await Promise.all([
    sanityFetch<ProjectDetail | null>({
      query: PROJECT_DETAIL_QUERY,
      params: { slug },
      tags: [`project:${slug}`, "projects"],
    }),
    sanityFetch<ProjectCard[] | null>({
      query: PROJECTS_INDEX_QUERY,
      tags: ["projects"],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ["settings"],
    }),
  ]);
  return { project, all: all ?? [], settings };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { project, settings } = await fetchData(slug);
  if (!project) return {};
  return buildMetadata({
    pageTitle: project.name,
    pageSeo: {
      ...project.seo,
      description:
        project.seo?.description ?? project.summary ?? project.imageAlt,
      image: project.seo?.image ?? project.image,
    },
    settings,
    pathname: `/portfolio/${project.slug}`,
  });
}

function safeUrl(image: unknown, width = 1600): string {
  if (!image || typeof image !== "object") return "";
  const asAny = image as { asset?: unknown };
  if (!asAny.asset) return "";
  try {
    return urlFor(image as never).width(width).url();
  } catch {
    return "";
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const { project, all, settings } = await fetchData(slug);
  if (!project) notFound();

  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : all[all.length - 1];
  const next = idx < all.length - 1 ? all[idx + 1] : all[0];

  const heroImage = safeUrl(project.image, 2400);
  const whatsapp = settings?.whatsapp ?? "https://wa.me/5585996477447";
  const categoryName = project.category?.name ?? "";

  return (
    <>
      <section className="page-intro container-edge pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="flex items-center justify-between pb-10">
          <Link
            href="/portfolio"
            className="pretty-link font-mono-label text-ink inline-flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path
                d="M13 7 H1 M6 2 L1 7 L6 12"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
            Todo o portfolio
          </Link>
          <DimensionLabel
            label={`${categoryName}${project.year ? ` · ${project.year}` : ""}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 items-end">
          <div className="md:col-span-7">
            {categoryName && <SectionLabel label={categoryName} />}
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink max-w-[14ch]">
              {project.name}.
            </h1>
            {project.summary && (
              <p className="mt-8 max-w-lg text-lg text-ink-2">
                {project.summary}
              </p>
            )}
          </div>
          <div className="md:col-span-5">
            <Hairline className="mb-6" />
            <dl className="grid grid-cols-2 gap-y-6 font-mono-label">
              {project.city && (
                <div>
                  <dt className="text-stone">Cidade</dt>
                  <dd className="mt-1 text-ink">{project.city}</dd>
                </div>
              )}
              {project.year && (
                <div>
                  <dt className="text-stone">Ano</dt>
                  <dd className="mt-1 text-ink">{project.year}</dd>
                </div>
              )}
              {project.area && (
                <div>
                  <dt className="text-stone">Área</dt>
                  <dd className="mt-1 text-ink">{project.area}</dd>
                </div>
              )}
              {project.scope && project.scope.length > 0 && (
                <div>
                  <dt className="text-stone">Escopo</dt>
                  <dd className="mt-1 text-ink">{project.scope.join(" · ")}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {heroImage && (
          <div className="mt-12 md:mt-16 relative overflow-hidden bg-bone-2 rounded-[12px] aspect-[16/10] md:aspect-[16/9]">
            <Image
              src={heroImage}
              alt={project.imageAlt ?? project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
      </section>

      {project.description && (
        <section className="container-edge py-16 md:py-24 reveal-on-scroll">
          <SectionLabel label="Sobre o projeto" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-2 hidden md:block pt-4">
              <Hairline reveal />
            </div>
            <p className="md:col-span-9 font-display text-[clamp(1.25rem,2.2vw,1.875rem)] leading-[1.4] text-ink max-w-[60ch]">
              {project.description}
            </p>
          </div>
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="container-edge py-16 md:py-24 reveal-on-scroll">
          <SectionLabel label="Galeria" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6">
            {project.gallery.map((img, i) => {
              const sizes = [
                "md:col-span-8 aspect-[4/3]",
                "md:col-span-4 aspect-[3/4] md:mt-12",
                "md:col-span-4 aspect-[3/4]",
                "md:col-span-8 aspect-[4/3] md:mt-12",
              ];
              const src = img.src ?? safeUrl(img.image, 1800);
              if (!src) return null;
              return (
                <div
                  key={i}
                  className={`relative overflow-hidden bg-bone-2 rounded-[8px] fade-up ${sizes[i % sizes.length]}`}
                >
                  <Image
                    src={src}
                    alt={img.alt ?? ""}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {all.length > 1 && (
        <section className="container-edge py-16 md:py-24 reveal-on-scroll">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href={`/portfolio/${prev.slug}`}
              className="group flex flex-col gap-2"
            >
              <span className="font-mono-label text-stone inline-flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path
                    d="M13 7 H1 M6 2 L1 7 L6 12"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                  />
                </svg>
                Projeto anterior
              </span>
              <span className="font-display text-2xl md:text-3xl text-ink group-hover:text-caramel-dark transition-colors duration-500">
                {prev.name}
              </span>
            </Link>
            <Link
              href={`/portfolio/${next.slug}`}
              className="group flex flex-col gap-2 items-end text-right"
            >
              <span className="font-mono-label text-stone inline-flex items-center gap-2">
                Próximo projeto
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path
                    d="M1 7 H13 M8 2 L13 7 L8 12"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                  />
                </svg>
              </span>
              <span className="font-display text-2xl md:text-3xl text-ink group-hover:text-caramel-dark transition-colors duration-500">
                {next.name}
              </span>
            </Link>
          </div>
        </section>
      )}

      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <div className="rounded-3xl bg-bone-2 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[18ch] reveal-word">
            <span>
              Quer um projeto{" "}
              <span className="italic text-caramel-dark">assim</span>?
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 md:justify-end fade-up">
            <CTA href={whatsapp} variant="primary" external>
              Fazer briefing
            </CTA>
            <CTA href="/contato" variant="ghost">
              Falar com a MM
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
}
