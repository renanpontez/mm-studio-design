import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CircleMark } from "@/components/ui/CircleMark";

type ServiceCard = {
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  includes?: string[];
};

type Props = {
  label?: string;
  services?: ServiceCard[];
};

export function ServicesDetailed({ label, services }: Props) {
  if (!services || services.length === 0) return null;

  return (
    <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
      <div className="container-edge">
        {label && <SectionLabel label={label} />}
        <div className="mt-12 space-y-20 md:space-y-32">
          {services.map((s) => (
            <article
              key={s.slug}
              className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 fade-up"
            >
              <div className="md:col-span-4">
                <CircleMark className="h-16 w-auto text-caramel-dark/60 mb-6" />
                <h2 className="font-display text-3xl md:text-5xl leading-tight text-ink">
                  {s.name}
                </h2>
                {s.tagline && (
                  <p className="mt-3 italic text-caramel-dark">{s.tagline}</p>
                )}
              </div>

              <div className="md:col-span-7 md:col-start-6">
                {s.description && (
                  <p className="text-ink-2 text-lg leading-relaxed">
                    {s.description}
                  </p>
                )}

                {s.includes && s.includes.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {s.includes.slice(0, 4).map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-ink-2"
                      >
                        <span className="text-caramel-dark min-w-[1.5rem] mt-1">•</span>
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
  );
}
