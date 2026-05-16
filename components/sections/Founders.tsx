import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CircleMark } from "@/components/ui/CircleMark";
import { CTA } from "@/components/ui/CTA";
import { founders, foundersPortrait } from "@/lib/content";

/**
 * MM variant: STACKED founder rows.
 * Atheliê shows a single portrait left + two bios stacked right.
 * MM gives each founder her own full-width row with circle-marked ordinal
 * on the left, name+bio big on the right. Reads as a more intentional
 * introduction of the two-person studio.
 */
export function Founders() {
  return (
    <section className="container-edge py-24 md:py-32 reveal-on-scroll">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <SectionLabel ordinal="04" label="A dupla MM" />
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[22ch] reveal-word">
            <span>
              Duas amigas, dois olhares,{" "}
              <span className="italic text-moss-dark">um estúdio</span>.
            </span>
          </h2>
        </div>
        <CTA href="/sobre" variant="underline">
          Sobre o estúdio
        </CTA>
      </div>

      <div className="mt-16">
        <Hairline reveal />
      </div>

      {/* shared portrait, anchored above the two rows */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-end">
        <div className="md:col-span-5 fade-up">
          <div className="relative overflow-hidden bg-bone-2 rounded-[8px] aspect-[4/5]">
            <Image
              src={foundersPortrait.src}
              alt={foundersPortrait.alt}
              fill
              sizes="(min-width: 768px) 35vw, 90vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-bone/80 backdrop-blur-md rounded-full p-3">
              <CircleMark className="h-10 w-10 text-moss-dark" />
            </div>
          </div>
          <div className="mt-4 flex justify-between font-mono-label text-stone">
            <span>Marly</span>
            <span>+</span>
            <span>Emilly</span>
          </div>
        </div>

        <div className="md:col-span-7 md:pl-8">
          <p className="font-display text-2xl md:text-3xl text-ink-2 italic leading-relaxed max-w-md fade-up">
            “Acreditamos que cada espaço carrega uma história. O nosso papel é
            escutar essa história e devolvê-la em forma de ambiente.”
          </p>
        </div>
      </div>

      {/* each founder gets her own row */}
      <div className="mt-20 space-y-16 md:space-y-20">
        {founders.map((f, i) => (
          <article
            key={f.name}
            className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10 items-start fade-up"
          >
            {/* left rail: ordinal inside a circle stamp */}
            <div className="md:col-span-3">
              <div className="relative inline-flex items-center justify-center">
                <CircleMark className="h-24 w-24 text-moss-dark/60" />
                <span className="absolute font-display text-3xl text-ink">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-4 font-mono-label text-stone">{f.role}</p>
            </div>

            {/* right: name + bio */}
            <div className="md:col-span-9 md:pl-4">
              <Hairline className="mb-5" />
              <h3 className="font-display text-4xl md:text-5xl leading-tight text-ink">
                {f.name}
              </h3>
              <p className="mt-5 text-ink-2 text-lg leading-relaxed max-w-2xl">
                {f.bio}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
