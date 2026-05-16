import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CTA } from "@/components/ui/CTA";
import { CircleMark } from "@/components/ui/CircleMark";
import { studio } from "@/lib/content";

export function ContactCTA() {
  return (
    <section
      id="contato"
      className="container-edge py-24 md:py-32 reveal-on-scroll"
    >
      <SectionLabel ordinal="06" label="Contato" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-end">
        <div className="md:col-span-8 relative">
          <CircleMark className="absolute -top-8 -left-2 md:-left-8 h-24 w-auto text-caramel-dark/40" />
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight max-w-[14ch] reveal-word">
            <span>
              Vamos criar{" "}
              <span className="italic text-caramel-dark">juntas</span>?
            </span>
          </h2>
          <p className="mt-8 max-w-md text-ink-2 fade-up">
            Estamos prontas para entender suas ideias e trazê-las à vida.
            Conte sobre o seu espaço, respondemos em até um dia útil.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 fade-up">
            <CTA href={studio.whatsapp} variant="primary" external>
              Iniciar conversa
            </CTA>
            <CTA href={`mailto:${studio.email}`} variant="ghost" external>
              Enviar e-mail
            </CTA>
          </div>
        </div>

        <div className="md:col-span-4">
          <Hairline className="mb-8" reveal />
          <dl className="space-y-6 font-mono-label">
            <div>
              <dt className="text-stone">Telefone</dt>
              <dd className="mt-2 text-ink">
                <a href={studio.phoneHref} className="pretty-link">
                  {studio.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-stone">E-mail</dt>
              <dd className="mt-2 text-ink !lowercase">
                <a href={`mailto:${studio.email}`} className="pretty-link">
                  {studio.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-stone">Instagram</dt>
              <dd className="mt-2 text-ink">
                <a
                  href={studio.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pretty-link"
                >
                  {studio.instagramHandle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-stone">Atendimento</dt>
              <dd className="mt-2 text-ink">
                {studio.cities.join(" · ")}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
