import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { cn } from "@/lib/utils";

type Segment = { text: string; italic?: boolean };

type Props = {
  ordinal?: string;
  label?: string;
  segments?: Segment[];
};

const DEFAULT_SEGMENTS: Segment[] = [
  { text: "Cada projeto é uma maneira de criar" },
  { text: "lugares vivos, conscientes", italic: true },
  { text: "e feitos para acolher quem os habita." },
];

export function Manifesto({
  ordinal = "01",
  label = "Manifesto",
  segments,
}: Props = {}) {
  // Sanity may return null/undefined; fall back to defaults in both cases.
  const segs = segments && segments.length > 0 ? segments : DEFAULT_SEGMENTS;
  let wordIndex = 0;
  return (
    <section className="container-edge py-24 md:py-32 manifesto-section">
      <SectionLabel ordinal={ordinal} label={label} />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-2 hidden md:block pt-6">
          <Hairline reveal />
        </div>
        <p className="md:col-span-10 font-display text-[clamp(1.75rem,4.4vw,3.5rem)] leading-[1.2] text-ink max-w-[36ch]">
          {segs.map((seg, segIdx) => (
            <span
              key={segIdx}
              className={cn(seg.italic && "italic text-caramel-dark")}
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
