import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CircleMark } from "@/components/ui/CircleMark";
import { CTA } from "@/components/ui/CTA";
import {
  founders as staticFounders,
  foundersPortrait as staticPortrait,
} from "@/lib/content";

type Founder = { name: string; role?: string; bio?: string };

type Props = {
  ordinal?: string;
  label?: string;
  heading?: React.ReactNode;
  intro?: React.ReactNode;
  portrait?: { src: string; alt?: string };
  founders?: Founder[];
};

const DEFAULT_INTRO_TEXT =
  "Acreditamos que cada espaço carrega uma história. O nosso papel é escutar essa história e devolvê-la em forma de ambiente.";

/**
 * MM variant: STACKED founder rows.
 * Atheliê shows a single portrait left + two bios stacked right.
 * MM gives each founder her own full-width row with circle-marked ordinal
 * on the left, name+bio big on the right.
 */
export function Founders({
  ordinal = "04",
  label = "A dupla MM",
  heading = (
    <span>
      Duas amigas, dois olhares,{" "}
      <span className="italic text-caramel-dark">um estúdio</span>.
    </span>
  ),
  intro = DEFAULT_INTRO_TEXT,
  portrait = staticPortrait,
  founders = staticFounders,
}: Props = {}) {
  // Sanity sends `intro` as a plain string; the static fallback / consumers may
  // send ReactNode. Strings get wrapped in the styled quote treatment so
  // editors don't lose visual hierarchy when filling text from the Studio.
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
          <SectionLabel ordinal={ordinal} label={label} />
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[22ch] reveal-word">
            {heading}
          </h2>
        </div>
        <CTA href="/sobre" variant="underline">
          Sobre o estúdio
        </CTA>
      </div>

      <div className="mt-16">
        <Hairline reveal />
      </div>

      {/* Portrait left, founders stacked right.
          Image is sticky on desktop so the bios scroll past it. */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-start">
        <div className="md:col-span-5 fade-up">
          <div className="md:sticky md:top-24">
            <div className="relative overflow-hidden bg-bone-2 rounded-[8px] aspect-[4/5]">
              {portrait?.src && (
                <Image
                  src={portrait.src}
                  alt={portrait.alt ?? ""}
                  fill
                  sizes="(min-width: 768px) 35vw, 90vw"
                  className="object-cover"
                />
              )}
              <div className="absolute bottom-4 left-4 bg-bone/80 backdrop-blur-md rounded-full p-3">
                <CircleMark className="h-10 w-10 text-caramel-dark" />
              </div>
            </div>
            <div className="mt-4 flex justify-between font-mono-label text-stone">
              {founders.slice(0, 3).map((f, i, arr) => (
                <span key={f.name}>
                  {f.name.split(" ")[0]}
                  {i < arr.length - 1 && <span className="ml-2">+</span>}
                </span>
              ))}
            </div>
            {introNode && <div className="mt-8">{introNode}</div>}
          </div>
        </div>

        <div className="md:col-span-7 md:pl-2 space-y-12 md:space-y-16">
          {founders.map((f, i) => (
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
      </div>
    </section>
  );
}
