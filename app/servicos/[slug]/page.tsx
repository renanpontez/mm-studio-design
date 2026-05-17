import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CircleMark } from "@/components/ui/CircleMark";
import { CTA } from "@/components/ui/CTA";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import {
  services,
  projects,
  categoryLabels,
  studio,
} from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} · MM Studio Design`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const idx = services.findIndex((s) => s.slug === slug);
  const next = services[(idx + 1) % services.length];

  const related = (service.relatedProjectSlugs ?? [])
    .map((sl) => projects.find((p) => p.slug === sl))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  return (
    <>
      <section className="page-intro container-edge pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="flex items-center justify-between pb-10">
          <Link
            href="/servicos"
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
            Todos os serviços
          </Link>
          <DimensionLabel label={`Serviço ${service.ordinal} de 03`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 items-end">
          <div className="md:col-span-8">
            <SectionLabel label="Serviço" />
            <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-tight text-ink max-w-[14ch]">
              {service.name}.
            </h1>
            <p className="mt-6 italic text-caramel-dark text-xl md:text-2xl">
              {service.tagline}
            </p>
            <p className="mt-8 max-w-lg text-lg text-ink-2">
              {service.description}
            </p>
          </div>
          <div className="md:col-span-4">
            <CircleMark className="h-20 w-auto text-caramel-dark/50" />
          </div>
        </div>
      </section>

      {service.forWho && service.forWho.length > 0 && (
        <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
          <div className="container-edge">
            <SectionLabel label="Para quem é" />
            <div className="mt-8">
              <Hairline reveal />
            </div>
            <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-stone/30">
              {service.forWho.map((item, i) => (
                <li
                  key={i}
                  className="bg-bone-2 p-8 md:p-10 fade-up flex flex-col gap-4"
                >
                  <span className="font-display text-5xl text-ink/15 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ink-2 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.includes && service.includes.length > 0 && (
        <section className="container-edge py-16 md:py-24 reveal-on-scroll">
          <SectionLabel label="O que inclui" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10">
            <div className="md:col-span-4">
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-ink reveal-word">
                <span>Tudo o que entregamos no escopo deste serviço.</span>
              </h2>
            </div>
            <ul className="md:col-span-7 md:col-start-6 space-y-4">
              {service.includes.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 fade-up border-b border-stone/30 pb-4"
                >
                  <span className="font-mono-label text-stone min-w-[2rem] mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink-2 text-lg leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.steps && service.steps.length > 0 && (
        <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
          <div className="container-edge">
            <SectionLabel label="Como funciona" />
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[16ch] reveal-word">
              <span>Cada etapa, com um propósito.</span>
            </h2>
            <div className="mt-12">
              <Hairline reveal />
            </div>
            <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-stone/30">
              {service.steps.map((step, i) => (
                <li key={i} className="bg-bone-2 p-8 md:p-10 fade-up">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl text-ink/15 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono-label text-stone">Etapa</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl text-ink">
                    {step.name}
                  </h3>
                  <p className="mt-3 text-ink-2 leading-relaxed">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {service.differentiators && service.differentiators.length > 0 && (
        <section className="container-edge py-16 md:py-24 reveal-on-scroll">
          <SectionLabel label="Diferenciais" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.differentiators.map((d, i) => (
              <article
                key={i}
                className="rounded-3xl bg-bone-2 p-8 md:p-10 fade-up"
              >
                <CircleMark className="h-12 w-auto text-caramel-dark/60" />
                <h3 className="mt-6 font-display text-2xl md:text-3xl text-ink leading-tight">
                  {d.title}
                </h3>
                <p className="mt-4 text-ink-2 leading-relaxed">
                  {d.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="container-edge py-16 md:py-24 reveal-on-scroll">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <SectionLabel label="Projetos relacionados" />
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[18ch] reveal-word">
                <span>Projetos que nasceram deste serviço.</span>
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="pretty-link font-mono-label text-ink"
            >
              Ver portfolio completo
            </Link>
          </div>
          <div className="mt-10">
            <Hairline reveal />
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="project-card group block fade-up"
              >
                <div className="project-image relative overflow-hidden bg-bone-2 rounded-[8px] aspect-[4/5]">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-mono-label text-stone">
                    {categoryLabels[p.category]} · {p.year}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-ink">
                    {p.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {service.faq && service.faq.length > 0 && (
        <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
          <div className="container-edge">
            <SectionLabel label="Perguntas frequentes" />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10">
              <div className="md:col-span-4">
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-ink reveal-word">
                  <span>O que costumam perguntar.</span>
                </h2>
              </div>
              <dl className="md:col-span-7 md:col-start-6 space-y-6">
                {service.faq.map((item, i) => (
                  <div key={i} className="border-b border-stone/30 pb-6 fade-up">
                    <dt className="font-display text-xl md:text-2xl text-ink">
                      {item.q}
                    </dt>
                    <dd className="mt-3 text-ink-2 leading-relaxed">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <div className="rounded-3xl bg-ink text-bone p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[18ch] reveal-word">
            <span>
              Pronta para começar com{" "}
              <span className="italic text-caramel">
                {service.name.toLowerCase()}
              </span>
              ?
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 md:justify-end fade-up">
            <a
              href={studio.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-bone px-7 py-3.5 text-sm tracking-wide text-ink transition-colors duration-500 hover:bg-caramel hover:text-bone"
            >
              <span className="font-mono-label !tracking-[0.16em]">
                Iniciar conversa
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M1 7 H13 M8 2 L13 7 L8 12"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                />
              </svg>
            </a>
            <Link
              href={`/servicos/${next.slug}`}
              className="pretty-link font-mono-label text-bone inline-flex items-center gap-2"
            >
              Próximo: {next.name}
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M1 7 H13 M8 2 L13 7 L8 12"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
