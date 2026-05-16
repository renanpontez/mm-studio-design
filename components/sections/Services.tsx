import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CircleMark } from "@/components/ui/CircleMark";
import { CTA } from "@/components/ui/CTA";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="servicos" className="bg-bone-2 py-24 md:py-32 reveal-on-scroll">
      <div className="container-edge">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <SectionLabel ordinal="03" label="Serviços" />
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[18ch] reveal-word">
              <span>
                Três jeitos de tirar a ideia{" "}
                <span className="italic text-moss-dark">do papel</span>.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-ink-2 fade-up">
            Da consultoria pontual à execução completa. Escolhemos juntos o
            formato que melhor se adapta ao seu projeto.
          </p>
        </div>

        <div className="mt-16">
          <Hairline reveal />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-stone/30">
          {services.map((s) => (
            <article
              key={s.slug}
              className="group relative bg-bone-2 p-8 md:p-10 transition-colors duration-700 hover:bg-bone fade-up"
            >
              <header className="flex items-start justify-between">
                <span className="font-mono-label text-stone">
                  {s.ordinal} / 03
                </span>
                <CircleMark className="h-10 w-auto text-ink/40 transition-all duration-700 group-hover:text-moss-dark group-hover:rotate-12" />
              </header>

              <h3 className="mt-12 font-display text-3xl md:text-4xl leading-tight text-ink">
                {s.name}
              </h3>
              <p className="mt-3 italic text-moss-dark">{s.tagline}</p>

              <p className="mt-6 text-ink-2 leading-relaxed">{s.description}</p>

              <div className="mt-10">
                <CTA href={`/servicos/${s.slug}`} variant="underline">
                  Saiba mais
                </CTA>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
