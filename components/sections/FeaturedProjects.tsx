import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CTA } from "@/components/ui/CTA";
import { projects as staticProjects, categoryLabels } from "@/lib/content";
import { cn } from "@/lib/utils";

type ProjectCard = {
  slug: string;
  name: string;
  category: string;
  city: string;
  year: number;
  image: string;
  imageAlt: string;
};

type Props = {
  ordinal?: string;
  label?: string;
  headingText?: string;
  projects?: ProjectCard[];
  viewAllHref?: string;
  viewAllLabel?: string;
};

const layoutClasses = [
  "md:col-span-7 md:mt-0",
  "md:col-span-5 md:mt-32",
  "md:col-span-5",
  "md:col-span-7 md:mt-24",
];

const imageRatios = [
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/3]",
];

export function FeaturedProjects({
  ordinal = "02",
  label = "Portfolio em destaque",
  headingText = "Casas e salas feitas com cuidado.",
  projects = staticProjects.slice(0, 4),
  viewAllHref = "/portfolio",
  viewAllLabel = "Ver portfolio completo",
}: Props = {}) {
  const featured = projects.slice(0, 4);

  return (
    <section
      id="portfolio"
      className="container-edge py-24 md:py-32 reveal-on-scroll"
    >
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <SectionLabel ordinal={ordinal} label={label} />
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[15ch] reveal-word">
            <span>{headingText}</span>
          </h2>
        </div>
        <CTA href={viewAllHref} variant="underline">
          {viewAllLabel}
        </CTA>
      </div>

      <div className="mt-16">
        <Hairline reveal />
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-20">
        {featured.map((p, i) => (
          <Link
            key={p.slug}
            href={`/portfolio/${p.slug}`}
            className={cn(
              "project-card group block fade-up",
              layoutClasses[i]
            )}
          >
            <div
              className={cn(
                "project-image relative overflow-hidden bg-bone-2 rounded-[8px]",
                imageRatios[i]
              )}
            >
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              ) : null}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 opacity-0 transition-opacity duration-700 group-hover:opacity-100 z-10">
                <span className="font-mono-label text-bone">{p.year}</span>
                <span className="font-mono-label text-bone inline-flex items-center gap-2">
                  ver projeto
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 7 H13 M8 2 L13 7 L8 12"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                    />
                  </svg>
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono-label text-stone">
                  {(categoryLabels as Record<string, string>)[p.category] ??
                    p.category}
                </p>
                <h3 className="mt-2 font-display text-2xl md:text-3xl leading-tight text-ink">
                  {p.name}
                </h3>
              </div>
              <p className="font-mono-label text-stone whitespace-nowrap mt-1">
                {p.city?.split(" · ")[1] ?? p.city}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
