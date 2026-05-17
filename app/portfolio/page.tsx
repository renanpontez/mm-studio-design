import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import {
  projects,
  categoryLabels,
  type ProjectCategory,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio · MM Studio Design",
  description:
    "Portfolio de projetos residenciais e corporativos do estúdio MM Studio Design, em Fortaleza.",
};

const order: ProjectCategory[] = ["residencial", "corporativo"];

export default function PortfolioPage() {
  return (
    <>
      <section className="page-intro container-edge pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="flex items-center justify-between pb-12 md:pb-16">
          <DimensionLabel
            label={`${projects.length.toString().padStart(2, "0")} projetos`}
          />
          <DimensionLabel label="Fortaleza · CE" className="hidden md:inline-flex" />
        </div>

        <SectionLabel label="Portfolio" />
        <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink max-w-[14ch]">
          Cada espaço tem{" "}
          <span className="italic text-caramel-dark">sua história</span>.
        </h1>
        <p className="mt-10 max-w-md text-ink-2">
          Projetos residenciais e corporativos desenvolvidos pelo estúdio.
          Cada um com seu desafio, sua paleta e sua atmosfera.
        </p>

        <nav className="mt-10 flex flex-wrap items-center gap-2 font-mono-label">
          <span className="text-stone mr-2">Categorias:</span>
          {order.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-ink hover:border-caramel-dark hover:bg-caramel-dark hover:text-bone transition-colors duration-500"
            >
              {categoryLabels[cat]}
            </a>
          ))}
        </nav>
      </section>

      {order.map((cat, catIdx) => {
        const list = projects.filter((p) => p.category === cat);
        if (list.length === 0) return null;
        return (
          <section
            key={cat}
            id={cat}
            className="container-edge py-16 md:py-24 reveal-on-scroll"
          >
            <div className="flex items-end justify-between flex-wrap gap-6">
              <SectionLabel label={categoryLabels[cat]} />
              <span className="font-mono-label text-stone">
                {String(list.length).padStart(2, "0")} projeto
                {list.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="mt-8">
              <Hairline reveal />
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {list.map((p) => (
                <Link
                  key={p.slug}
                  href={`/portfolio/${p.slug}`}
                  className="project-card group block fade-up"
                >
                  <div className="project-image relative overflow-hidden bg-bone-2 rounded-[8px] aspect-[4/3]">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono-label text-stone">
                        {categoryLabels[p.category]} · {p.year}
                      </p>
                      <h3 className="mt-2 font-display text-2xl md:text-3xl leading-tight text-ink">
                        {p.name}
                      </h3>
                    </div>
                  </div>
                  {p.summary && (
                    <p className="mt-3 text-ink-2 max-w-md">{p.summary}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
