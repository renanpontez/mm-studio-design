import Image from "next/image";
import { CTA } from "@/components/ui/CTA";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import { CircleMark } from "@/components/ui/CircleMark";
import { studio, heroFeature as defaultFeature } from "@/lib/content";

type Feature = {
  image: string;
  imageAlt: string;
  projectName: string;
  projectCity: string;
  projectCategory: string;
  projectYear: number;
};

type CTAProp = { label: string; href: string; external?: boolean };

type Props = {
  eyebrow?: string;
  headline?: React.ReactNode;
  body?: string;
  ctaPrimary?: CTAProp;
  ctaSecondary?: CTAProp;
  feature?: Feature;
};

const DEFAULT_HEADLINE = (
  <>
    <span className="reveal-word">
      <span>Espaços que</span>
    </span>
    <span className="block italic text-caramel-dark reveal-word">
      <span>respiram</span>
    </span>
    <span className="block reveal-word">
      <span>sua história.</span>
    </span>
  </>
);

/**
 * MM hero variant: SPLIT layout.
 * Atheliê uses a full-bleed image with editorial copy floating on a bone gradient.
 * MM uses a clean split: solid bone left with copy, image right inside a card
 * with the circle stamp. Feels more handmade, more vegetal.
 */
export function Hero({
  eyebrow = "Estúdio de design de interiores",
  headline = DEFAULT_HEADLINE,
  body = "Design de interiores residencial e corporativo em Fortaleza, com olhar sustentável e a sensibilidade de duas amigas que projetam juntas.",
  ctaPrimary = { label: "Ver portfolio", href: "#portfolio" },
  ctaSecondary = { label: "Conversar", href: studio.whatsapp, external: true },
  feature,
}: Props = {}) {
  // Fall back to default feature if missing or image empty
  const heroFeature = feature && feature.image ? feature : defaultFeature;
  return (
    <section className="hero relative min-h-[100svh] container-edge overflow-hidden">
      <div className="pt-32 md:pt-40 pb-16">
        <div className="flex items-center justify-between pb-12 md:pb-16">
          <DimensionLabel label="MM · est. 2020" />
          <DimensionLabel
            label={studio.cities.join(" · ")}
            className="hidden md:inline-flex !text-ink-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-stretch">
          {/* left: editorial copy */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {eyebrow && (
              <p className="font-mono-label text-stone mb-6 reveal-word">
                <span>{eyebrow}</span>
              </p>
            )}

            <h1 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-ink">
              {headline}
            </h1>

            {body && (
              <p className="mt-10 max-w-md text-base md:text-lg text-ink-2 fade-up">
                {body}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-4 fade-up">
              {ctaPrimary && (
                <CTA
                  href={ctaPrimary.href}
                  variant="primary"
                  external={ctaPrimary.external}
                >
                  {ctaPrimary.label}
                </CTA>
              )}
              {ctaSecondary && (
                <CTA
                  href={ctaSecondary.href}
                  variant="ghost"
                  external={ctaSecondary.external}
                >
                  {ctaSecondary.label}
                </CTA>
              )}
            </div>
          </div>

          {/* right: image card with circle stamp */}
          <div className="md:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-bone-2 rounded-[8px]">
              {heroFeature.image && (
                <Image
                  src={heroFeature.image}
                  alt={heroFeature.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="hero-image object-cover"
                />
              )}
              <div className="absolute top-4 right-4 bg-bone/85 backdrop-blur-md rounded-full p-3">
                <CircleMark className="h-10 w-10 text-caramel-dark" />
              </div>
            </div>

            {heroFeature.projectName && (
              <div className="mt-4 flex flex-col items-start gap-2 fade-up">
                <div className="font-mono-label text-ink-2 flex items-center gap-2">
                  <span className="h-px w-6 bg-ink/30" />
                  <span>Projeto em destaque</span>
                </div>
                <div className="inline-flex items-center gap-3 rounded-full bg-bone/60 backdrop-blur-md px-4 py-2 font-mono-label shadow-soft ring-1 ring-bone/40">
                  <span className="block h-1.5 w-1.5 rounded-full bg-caramel-dark" />
                  <span className="text-ink">{heroFeature.projectName}</span>
                  <span className="text-ink-2/80">
                    · {heroFeature.projectCity}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
