import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CircleMark } from "@/components/ui/CircleMark";
import { processSteps } from "@/lib/content";

/**
 * MM variant: VERTICAL TIMELINE.
 * Atheliê shows a 4-step horizontal grid with a progress line on top.
 * MM uses a vertical timeline with each step as a row, a hand-circle marker
 * on the left rail, and a thin caramel line drawing top-to-bottom on scroll.
 */
export function Process() {
  return (
    <section className="bg-bone-2 py-24 md:py-32 reveal-on-scroll">
      <div className="container-edge">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <SectionLabel ordinal="05" label="Processo" />
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[18ch] reveal-word">
              <span>
                Como caminhamos juntas, do briefing às chaves.
              </span>
            </h2>
          </div>
        </div>

        <div className="mt-16">
          <Hairline reveal />
        </div>

        {/* vertical timeline */}
        <ol className="mt-12 relative">
          {/* the rail */}
          <div
            className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-stone/30"
            aria-hidden="true"
          />
          {/* progress line that fills top-to-bottom on scroll */}
          <div
            className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-caramel-dark/60 progress-line"
            aria-hidden="true"
          />

          {processSteps.map((step) => (
            <li
              key={step.ordinal}
              className="relative grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-10 pl-16 md:pl-24 pb-12 md:pb-20 last:pb-0 fade-up"
            >
              {/* circle marker on the rail */}
              <div className="absolute left-0 top-0 flex items-center justify-center w-12 md:w-20 h-12">
                <span className="relative inline-flex items-center justify-center w-12 h-12 bg-bone-2 rounded-full">
                  <CircleMark className="h-10 w-10 text-caramel-dark" />
                  <span className="absolute font-mono-label text-ink text-[0.65rem]">
                    {step.ordinal}
                  </span>
                </span>
              </div>

              <div className="md:col-span-4">
                <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                  {step.name}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-ink-2 leading-relaxed text-lg max-w-xl">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
