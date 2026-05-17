import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CircleMark } from "@/components/ui/CircleMark";
import { CTA } from "@/components/ui/CTA";
import { services as staticServices } from "@/lib/content";

type ServiceCard = {
  slug: string;
  ordinal?: string;
  name: string;
  tagline?: string;
  description?: string;
};

type Props = {
  ordinal?: string;
  label?: string;
  heading?: React.ReactNode;
  intro?: string;
  services?: ServiceCard[];
};

export function Services({
  ordinal = "03",
  label = "Serviços",
  heading = (
    <span>
      Três jeitos de tirar a ideia{" "}
      <span className="italic text-caramel-dark">do papel</span>.
    </span>
  ),
  intro = "Da consultoria pontual à execução completa. Escolhemos juntos o formato que melhor se adapta ao seu projeto.",
  services = staticServices,
}: Props = {}) {
  const total = String(services.length).padStart(2, "0");
  return (
    <section id="servicos" className="bg-bone-2 py-24 md:py-32 reveal-on-scroll">
      <div className="container-edge">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <SectionLabel ordinal={ordinal} label={label} />
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[18ch] reveal-word">
              {heading}
            </h2>
          </div>
          <p className="max-w-sm text-ink-2 fade-up">{intro}</p>
        </div>

        <div className="mt-16">
          <Hairline reveal />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-stone/30">
          {services.map((s, i) => (
            <article
              key={s.slug}
              className="group relative bg-bone-2 p-8 md:p-10 transition-colors duration-700 hover:bg-bone fade-up"
            >
              <header className="flex items-start justify-between">
                <span className="font-mono-label text-stone">
                  {s.ordinal ?? String(i + 1).padStart(2, "0")} / {total}
                </span>
                <CircleMark className="h-10 w-auto text-ink/40 transition-all duration-700 group-hover:text-caramel-dark group-hover:rotate-12" />
              </header>

              <h3 className="mt-12 font-display text-3xl md:text-4xl leading-tight text-ink">
                {s.name}
              </h3>
              {s.tagline && (
                <p className="mt-3 italic text-caramel-dark">{s.tagline}</p>
              )}

              {s.description && (
                <p className="mt-6 text-ink-2 leading-relaxed">
                  {s.description}
                </p>
              )}

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
