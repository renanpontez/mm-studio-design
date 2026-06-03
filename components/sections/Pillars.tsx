import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";

type Pillar = { name: string; description?: string };

type Props = {
  label?: string;
  heading?: React.ReactNode;
  pillars?: Pillar[];
};

export function Pillars({ label, heading, pillars }: Props) {
  if (!pillars || pillars.length === 0) return null;
  return (
    <section className="container-edge py-24 md:py-32">
      {label && <SectionLabel label={label} />}
      {heading && (
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight text-ink mt-6 max-w-[24ch]">
          {heading}
        </h2>
      )}
      <Hairline className="mt-10 mb-12" />
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {pillars.map((p, i) => (
          <li key={`${p.name}-${i}`} className="fade-up">
            <p className="font-mono-label text-stone mb-3">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="font-display text-2xl text-ink mb-3">{p.name}</h3>
            {p.description && <p className="text-ink-2 leading-relaxed">{p.description}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
