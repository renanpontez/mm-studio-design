import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CTA } from "@/components/ui/CTA";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import { projects, categoryLabels, studio } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} · MM Studio Design`,
    description: project.summary ?? project.imageAlt,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];

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
            label={`${categoryLabels[project.category]} · ${project.year}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 items-end">
          <div className="md:col-span-7">
            <SectionLabel
              ordinal={String(idx + 1).padStart(2, "0")}
              label={categoryLabels[project.category]}
            />
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
              <div>
                <dt className="text-stone">Cidade</dt>
                <dd className="mt-1 text-ink">{project.city}</dd>
              </div>
              <div>
                <dt className="text-stone">Ano</dt>
                <dd className="mt-1 text-ink">{project.year}</dd>
              </div>
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

        <div className="mt-12 md:mt-16 relative overflow-hidden bg-bone-2 rounded-[12px] aspect-[16/10] md:aspect-[16/9]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {project.description && (
        <section className="container-edge py-16 md:py-24 reveal-on-scroll">
          <SectionLabel ordinal="02" label="Sobre o projeto" />
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
          <SectionLabel ordinal="03" label="Galeria" />
          <div className="mt-10">
            <Hairline reveal />
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6">
            {project.gallery.map((img, i) => {
              const sizes = [
                "md:col-span-8 aspect-[4/3]",
                "md:col-span-4 aspect-[3/4] md:mt-12",
                "md:col-span-4 aspect-[3/4]",
                "md:col-span-8 aspect-[4/3] md:mt-12",
              ];
              return (
                <div
                  key={i}
                  className={`relative overflow-hidden bg-bone-2 rounded-[8px] fade-up ${sizes[i % sizes.length]}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
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

      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <Hairline reveal />
        <div className="mt-10 grid grid-cols-2 gap-6">
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
            <span className="font-display text-2xl md:text-3xl text-ink group-hover:text-moss-dark transition-colors duration-500">
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
            <span className="font-display text-2xl md:text-3xl text-ink group-hover:text-moss-dark transition-colors duration-500">
              {next.name}
            </span>
          </Link>
        </div>
      </section>

      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <div className="rounded-3xl bg-bone-2 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[18ch] reveal-word">
            <span>
              Quer um projeto{" "}
              <span className="italic text-moss-dark">assim</span>?
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 md:justify-end fade-up">
            <CTA href={studio.whatsapp} variant="primary" external>
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
