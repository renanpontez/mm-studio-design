import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CircleMark } from "@/components/ui/CircleMark";
import { CTA } from "@/components/ui/CTA";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import {
  studio,
  founders,
  foundersPortrait,
  pillars,
  processSteps,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre · MM Studio Design",
  description:
    "MM Studio Design é um estúdio de design de interiores em Fortaleza, fundado por Marly Martins e Emilly Lorrany.",
};

export default function SobrePage() {
  return (
    <>
      <section className="page-intro container-edge pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="flex items-center justify-between pb-12 md:pb-16">
          <DimensionLabel label="Est. 2020 · Fortaleza" />
          <DimensionLabel label="Design de interiores" className="hidden md:inline-flex" />
        </div>

        <SectionLabel ordinal="01" label="Sobre" />
        <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-tight text-ink max-w-[16ch]">
          Duas amigas, dois olhares,{" "}
          <span className="italic text-caramel-dark">um estúdio</span>.
        </h1>
        <p className="mt-10 max-w-xl text-lg md:text-xl text-ink-2">
          MM Studio Design nasceu da amizade entre Marly Martins e Emilly
          Lorrany, duas profissionais apaixonadas por transformar espaços.
          O estúdio combina olhar sustentável e inovação de processo.
        </p>
      </section>

      <section className="container-edge py-16 md:py-24 manifesto-section reveal-on-scroll">
        <SectionLabel ordinal="02" label="Manifesto" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-2 hidden md:block pt-6">
            <Hairline reveal />
          </div>
          <p className="md:col-span-10 font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.2] text-ink max-w-[40ch]">
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">Cada </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">projeto </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">é </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">uma </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">maneira </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">de </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">criar </span>
            <span className="italic text-caramel-dark">
              <span className="manifesto-word inline-block opacity-15 me-[0.28em]">lugares </span>
              <span className="manifesto-word inline-block opacity-15 me-[0.28em]">vivos, </span>
              <span className="manifesto-word inline-block opacity-15 me-[0.28em]">conscientes </span>
            </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">e </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">feitos </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">para </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">acolher </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">quem </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">os </span>
            <span className="manifesto-word inline-block opacity-15 me-[0.28em]">habita.</span>
          </p>
        </div>
      </section>

      {/* portrait + intro */}
      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <SectionLabel ordinal="03" label="A dupla MM" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-center">
          <div className="md:col-span-5 fade-up">
            <div className="relative overflow-hidden bg-bone-2 rounded-[8px] aspect-[4/5]">
              <Image
                src={foundersPortrait.src}
                alt={foundersPortrait.alt}
                fill
                sizes="(min-width: 768px) 35vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex justify-between font-mono-label text-stone">
              <span>Marly Martins</span>
              <span>+</span>
              <span>Emilly Lorrany</span>
            </div>
          </div>

          <div className="md:col-span-7 md:pl-8">
            <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] max-w-[22ch] reveal-word">
              <span>
                Sustentabilidade e{" "}
                <span className="italic text-caramel-dark">sensibilidade</span>{" "}
                em cada decisão.
              </span>
            </h2>
            <p className="mt-8 text-ink-2 max-w-md fade-up">
              Marly traz o olhar sustentável e a precisão técnica. Emilly traz
              a inovação de processo e a tradução da vontade do cliente. Juntas,
              equilibram cada projeto entre intenção e execução.
            </p>
          </div>
        </div>
      </section>

      {/* bios stacked rows (same shape as homepage Founders) */}
      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <div className="space-y-16 md:space-y-20">
          {founders.map((f, i) => (
            <article
              key={f.name}
              className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10 items-start fade-up"
            >
              <div className="md:col-span-3">
                <div className="relative inline-flex items-center justify-center">
                  <CircleMark className="h-24 w-24 text-caramel-dark/60" />
                  <span className="absolute font-display text-3xl text-ink">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-4 font-mono-label text-stone">{f.role}</p>
              </div>
              <div className="md:col-span-9 md:pl-4">
                <Hairline className="mb-5" />
                <h3 className="font-display text-4xl md:text-5xl leading-tight text-ink">
                  {f.name}
                </h3>
                <p className="mt-5 text-ink-2 text-lg leading-relaxed max-w-2xl">
                  {f.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <SectionLabel ordinal="04" label="Valores" />
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[18ch] reveal-word">
              <span>Três pilares de cada projeto.</span>
            </h2>
          </div>
        </div>

        <div className="mt-12">
          <Hairline reveal />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-stone/30">
          {pillars.map((p) => (
            <article
              key={p.ordinal}
              className="bg-bone p-8 md:p-10 fade-up flex flex-col gap-6"
            >
              <header className="flex items-start justify-between">
                <span className="font-mono-label text-stone">{p.ordinal} / 03</span>
                <CircleMark className="h-10 w-auto text-caramel-dark/50" />
              </header>
              <h3 className="font-display text-3xl md:text-4xl leading-tight text-ink">
                {p.name}
              </h3>
              <p className="text-ink-2 leading-relaxed">{p.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
        <div className="container-edge">
          <SectionLabel ordinal="05" label="Processo" />
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[18ch] reveal-word">
            <span>Como caminhamos juntas.</span>
          </h2>

          <ol className="mt-12 relative">
            <div
              className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-stone/30"
              aria-hidden="true"
            />
            <div
              className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-caramel-dark/60 progress-line"
              aria-hidden="true"
            />

            {processSteps.map((step) => (
              <li
                key={step.ordinal}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-10 pl-16 md:pl-24 pb-12 md:pb-20 last:pb-0 fade-up"
              >
                <div className="absolute left-0 top-0 flex items-center justify-center w-12 md:w-20 h-12">
                  <span className="relative inline-flex items-center justify-center w-12 h-12 bg-bone-2 rounded-full">
                    <CircleMark className="h-10 w-10 text-caramel-dark" />
                    <span className="absolute font-mono-label text-ink text-[0.65rem]">
                      {step.ordinal}
                    </span>
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                    {step.name}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-2 leading-relaxed text-lg max-w-xl">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <div className="rounded-3xl bg-bone-2 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[18ch] reveal-word">
            <span>
              Vamos criar{" "}
              <span className="italic text-caramel-dark">juntas</span>?
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 md:justify-end fade-up">
            <CTA href={studio.whatsapp} variant="primary" external>
              Iniciar conversa
            </CTA>
            <Link
              href="/portfolio"
              className="pretty-link font-mono-label text-ink inline-flex items-center gap-2"
            >
              Ver portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
