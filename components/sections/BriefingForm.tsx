import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/sections/ContactForm";

type Props = {
  label?: string;
  heading?: React.ReactNode;
  intro?: string;
  metadata?: { label: string; value: string }[];
};

export function BriefingForm({ label, heading, intro, metadata }: Props) {
  return (
    <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
      <div className="container-edge">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            {label && <SectionLabel label={label} />}
            {heading && (
              <h2 className="mt-6 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[18ch] reveal-word">
                <span>{heading}</span>
              </h2>
            )}
            {intro && (
              <p className="mt-6 text-ink-2 max-w-sm fade-up">{intro}</p>
            )}

            {metadata && metadata.length > 0 && (
              <dl className="mt-10 space-y-4 font-mono-label">
                {metadata.map((m, i) => (
                  <div key={`${m.label}-${i}`}>
                    <dt className="text-stone">{m.label}</dt>
                    <dd className="mt-1 text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
