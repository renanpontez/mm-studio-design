import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";
import type { RichHeadline } from "@/sanity/types";

type Props = {
  label?: string;
  body?: RichHeadline;
};

/**
 * Renders portable-text manifesto. Each child span's `italicAccent` mark is
 * detected on the frontend and styled (italic + caramel). Words are split for
 * the staggered fade-in via the existing `.manifesto-word` reveal.
 */
export function Manifesto({ label, body }: Props) {
  if (!body || body.length === 0) return null;

  let wordIndex = 0;
  return (
    <section className="container-edge py-24 md:py-32 manifesto-section">
      {label && <SectionLabel label={label} />}
      <div className="mt-12">
        <p className="font-display text-[clamp(1.75rem,4.4vw,3.5rem)] leading-[1.2] text-ink max-w-[36ch]">
          {body.map((block, bi) =>
            block.children.map((child, ci) => {
              const isItalic = child.marks?.includes("italicAccent");
              return (
                <span
                  key={`${bi}-${ci}`}
                  className={cn(isItalic && "italic text-caramel-dark")}
                >
                  {child.text.split(" ").map((word) => {
                    if (!word) return null;
                    wordIndex += 1;
                    return (
                      <span
                        key={`${bi}-${ci}-${wordIndex}`}
                        className="manifesto-word inline-block opacity-15 me-[0.28em]"
                      >
                        {word}
                      </span>
                    );
                  })}
                </span>
              );
            })
          )}
        </p>
      </div>
    </section>
  );
}
