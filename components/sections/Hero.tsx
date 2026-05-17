import Image from "next/image";
import { CTA } from "@/components/ui/CTA";
import { CircleMark } from "@/components/ui/CircleMark";

type Feature = {
  image: string;
  imageAlt: string;
  projectName?: string;
  projectCity?: string;
  projectCategory?: string;
  projectYear?: number;
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

/**
 * MM hero — split editorial layout. No hardcoded fallbacks: every visible
 * element renders only when Sanity provides the data. Reference layout with
 * all fields populated lives in `app/page.backup.tsx`.
 */
export function Hero({
  eyebrow,
  headline,
  body,
  ctaPrimary,
  ctaSecondary,
  feature,
}: Props) {
  return (
    <section className="hero relative min-h-[100svh] container-edge overflow-hidden">
      <div className="pt-32 md:pt-40 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-stretch">
          <div className="md:col-span-7 flex flex-col justify-center">
            {eyebrow && (
              <p className="font-mono-label text-stone mb-6 reveal-word">
                <span>{eyebrow}</span>
              </p>
            )}

            {headline && (
              <h1 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-ink">
                {headline}
              </h1>
            )}

            {body && (
              <p className="mt-10 max-w-md text-base md:text-lg text-ink-2 fade-up">
                {body}
              </p>
            )}

            {(ctaPrimary || ctaSecondary) && (
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
            )}
          </div>

          {feature?.image && (
            <div className="md:col-span-5 relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-bone-2 rounded-[8px]">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="hero-image object-cover"
                />
                <div className="absolute top-4 right-4 bg-bone/85 backdrop-blur-md rounded-full p-3">
                  <CircleMark className="h-10 w-10 text-caramel-dark" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
