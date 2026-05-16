import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { cn } from "@/lib/utils";

const segments: { text: string; italic?: boolean }[] = [
  { text: "Cada projeto é uma maneira de criar" },
  { text: "lugares vivos, conscientes", italic: true },
  { text: "e feitos para acolher quem os habita." },
];

export function Manifesto() {
  let wordIndex = 0;
  return (
    <section className="container-edge pt-32 md:pt-48 pb-12 md:pb-20 manifesto-section">
      <SectionLabel ordinal="01" label="Manifesto" />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-2 hidden md:block pt-6">
          <Hairline reveal />
        </div>
        <p className="md:col-span-10 font-display text-[clamp(1.75rem,4.4vw,3.5rem)] leading-[1.2] text-ink max-w-[36ch]">
          {segments.map((seg, segIdx) => (
            <span
              key={segIdx}
              className={cn(seg.italic && "italic text-moss-dark")}
            >
              {seg.text.split(" ").map((word) => {
                wordIndex += 1;
                return (
                  <span
                    key={`${segIdx}-${wordIndex}`}
                    className="manifesto-word inline-block opacity-15 me-[0.28em]"
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
