import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CircleMark } from "@/components/ui/CircleMark";
import { CTA } from "@/components/ui/CTA";

type Founder = { name: string; role?: string; bio?: string };

type Props = {
  label?: string;
  heading?: React.ReactNode;
  intro?: React.ReactNode;
  portrait?: { src: string; alt?: string };
  founders?: Founder[];
};

/**
 * Portrait left + founder rows right. No defaults — when Sanity is empty,
 * the section bows out. Reference layout in `app/page.backup.tsx`.
 *
 * `intro` accepts either a plain string (from Sanity) or a ReactNode (from
 * the backup page). Strings get wrapped in the styled italic quote.
 */
export function Founders({
  label,
  heading,
  intro,
  portrait,
  founders,
}: Props) {
  const list = founders ?? [];
  if (list.length === 0 && !heading && !portrait) return null;

  const introNode =
    typeof intro === "string" ? (
      <p className="font-display text-2xl md:text-3xl text-ink-2 italic leading-relaxed max-w-md fade-up">
        “{intro}”
      </p>
    ) : (
      intro
    );

  return (
    <section className="container-edge py-24 md:py-32 reveal-on-scroll">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          {label && <SectionLabel label={label} />}
          {heading && (
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[22ch] reveal-word">
              {heading}
            </h2>
          )}
        </div>
        <CTA href="/sobre" variant="underline">
          Sobre o estúdio
        </CTA>
      </div>

      <div className="mt-16">
        <Hairline reveal />
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-start">
        {portrait?.src && (
          <div className="md:col-span-5 fade-up">
            <div className="md:sticky md:top-24">
              <div className="relative overflow-hidden bg-bone-2 rounded-[8px] aspect-[4/5]">
                <Image
                  src={portrait.src}
                  alt={portrait.alt ?? ""}
                  fill
                  sizes="(min-width: 768px) 35vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-bone/80 backdrop-blur-md rounded-full p-3">
                  <CircleMark className="h-10 w-10 text-caramel-dark" />
                </div>
              </div>
              {list.length > 0 && (
                <div className="mt-4 flex justify-between font-mono-label text-stone">
                  {list.slice(0, 3).map((f, i, arr) => (
                    <span key={f.name}>
                      {f.name.split(" ")[0]}
                      {i < arr.length - 1 && <span className="ml-2">+</span>}
                    </span>
                  ))}
                </div>
              )}
              {introNode && <div className="mt-8">{introNode}</div>}
            </div>
          </div>
        )}

        {list.length > 0 && (
          <div
            className={
              portrait?.src
                ? "md:col-span-7 md:pl-2 space-y-12 md:space-y-16"
                : "md:col-span-12 space-y-12 md:space-y-16"
            }
          >
            {list.map((f, i) => (
              <article
                key={f.name}
                className="grid grid-cols-1 md:grid-cols-12 gap-y-5 md:gap-x-8 items-start fade-up"
              >
                <div className="md:col-span-3">
                  <div className="relative inline-flex items-center justify-center">
                    <CircleMark className="h-16 w-16 text-caramel-dark/60" />
                    <span className="absolute font-display text-xl text-ink">
                      0{i + 1}
                    </span>
                  </div>
                  {f.role && (
                    <p className="mt-3 font-mono-label text-stone">{f.role}</p>
                  )}
                </div>

                <div className="md:col-span-9">
                  <Hairline className="mb-4" />
                  <h3 className="font-display text-2xl md:text-3xl leading-tight text-ink">
                    {f.name}
                  </h3>
                  {f.bio && (
                    <p className="mt-4 text-ink-2 leading-relaxed">{f.bio}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
