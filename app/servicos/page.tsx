import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CircleMark } from "@/components/ui/CircleMark";
import { CTA } from "@/components/ui/CTA";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import { services, studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Serviços · MM Studio Design",
  description:
    "Consultoria Completa, Projeto de Interiores e Execução de Obras. Três jeitos de trabalhar com o MM Studio Design.",
};

export default function ServicosPage() {
  return (
    <>
      <section className="page-intro container-edge pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="flex items-center justify-between pb-12 md:pb-16">
          <DimensionLabel label="03 serviços" />
          <DimensionLabel label={studio.cities.join(" · ")} className="hidden md:inline-flex" />
        </div>

        <SectionLabel label="Serviços" />
        <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink max-w-[15ch]">
          Três jeitos de tirar a ideia{" "}
          <span className="italic text-caramel-dark">do papel</span>.
        </h1>
        <p className="mt-10 max-w-md text-ink-2">
          Da consultoria pontual ao acompanhamento integral de obra.
          Escolhemos juntas o formato que melhor se adapta ao seu projeto.
        </p>
      </section>

      <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
        <div className="container-edge">
          <SectionLabel label="Em detalhe" />
          <div className="mt-12 space-y-20 md:space-y-32">
            {services.map((s) => (
              <article
                key={s.slug}
                className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 fade-up"
              >
                <div className="md:col-span-4">
                  <CircleMark className="h-16 w-auto text-caramel-dark/60 mb-6" />
                  <span className="font-display text-7xl md:text-8xl text-ink/15 leading-none">
                    {s.ordinal}
                  </span>
                  <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight text-ink">
                    {s.name}
                  </h2>
                  <p className="mt-3 italic text-caramel-dark">{s.tagline}</p>
                </div>

                <div className="md:col-span-7 md:col-start-6">
                  <Hairline className="mb-6" />
                  <p className="text-ink-2 text-lg leading-relaxed">
                    {s.description}
                  </p>

                  {s.includes && (
                    <ul className="mt-8 space-y-3">
                      {s.includes.slice(0, 4).map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-ink-2"
                        >
                          <span className="font-mono-label text-stone min-w-[1.5rem] mt-1">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-10">
                    <Link
                      href={`/servicos/${s.slug}`}
                      className="pretty-link inline-flex items-center gap-2 font-mono-label text-ink"
                    >
                      Conhecer o serviço completo
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        <path d="M1 7 H13 M8 2 L13 7 L8 12" stroke="currentColor" strokeWidth="1.4" fill="none" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <div className="rounded-3xl bg-bone-2 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[20ch] reveal-word">
            <span>
              Não sabe qual{" "}
              <span className="italic text-caramel-dark">se encaixa</span>?
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 md:justify-end fade-up">
            <CTA href={studio.whatsapp} variant="primary" external>
              Conversar
            </CTA>
            <CTA href="/contato" variant="ghost">
              Enviar mensagem
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
}
