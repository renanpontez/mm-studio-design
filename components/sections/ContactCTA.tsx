import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CTA } from "@/components/ui/CTA";
import { CircleMark } from "@/components/ui/CircleMark";

type StudioContact = {
  whatsapp?: string;
  email?: string;
  phone?: string;
  phoneHref?: string;
  instagram?: string;
  instagramHandle?: string;
  cities?: string[];
};

type Props = {
  label?: string;
  heading?: React.ReactNode;
  intro?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  contact?: StudioContact;
};

export function ContactCTA({
  label,
  heading,
  intro,
  ctaPrimaryLabel,
  ctaSecondaryLabel,
  contact,
}: Props) {
  if (!heading && !contact) return null;

  return (
    <section
      id="contato"
      className="container-edge py-24 md:py-32 reveal-on-scroll"
    >
      {label && <SectionLabel label={label} />}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-start">
        <div className="md:col-span-5">
          <Hairline className="mb-8" reveal />
          <dl className="space-y-6 font-mono-label">
            {contact?.phone && (
              <div>
                <dt className="text-stone">Telefone</dt>
                <dd className="mt-2 text-ink">
                  <a
                    href={contact.phoneHref ?? `tel:${contact.phone}`}
                    className="pretty-link"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
            )}
            {contact?.email && (
              <div>
                <dt className="text-stone">E-mail</dt>
                <dd className="mt-2 text-ink !lowercase">
                  <a
                    href={`mailto:${contact.email}`}
                    className="pretty-link"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            )}
            {contact?.instagram && (
              <div>
                <dt className="text-stone">Instagram</dt>
                <dd className="mt-2 text-ink">
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pretty-link"
                  >
                    {contact.instagramHandle ?? "Instagram"}
                  </a>
                </dd>
              </div>
            )}
            {contact?.cities && contact.cities.length > 0 && (
              <div>
                <dt className="text-stone">Atendimento</dt>
                <dd className="mt-2 text-ink">
                  {contact.cities.join(" · ")}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="md:col-span-7 relative md:pl-6">
          <CircleMark className="absolute -top-8 -right-2 md:-right-4 h-24 w-auto text-caramel-dark/40" />
          {heading && (
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight max-w-[14ch] reveal-word">
              {heading}
            </h2>
          )}
          {intro && (
            <p className="mt-8 max-w-md text-ink-2 fade-up">{intro}</p>
          )}

          {(contact?.whatsapp || contact?.email) && (
            <div className="mt-10 flex flex-wrap items-center gap-4 fade-up">
              {contact?.whatsapp && ctaPrimaryLabel && (
                <CTA href={contact.whatsapp} variant="primary" external>
                  {ctaPrimaryLabel}
                </CTA>
              )}
              {contact?.email && ctaSecondaryLabel && (
                <CTA
                  href={`mailto:${contact.email}`}
                  variant="ghost"
                  external
                >
                  {ctaSecondaryLabel}
                </CTA>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
