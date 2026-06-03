import { SectionLabel } from "@/components/ui/SectionLabel";
import { DimensionLabel } from "@/components/ui/DimensionLabel";

type Props = {
  dimensionLeft?: string;
  dimensionRight?: string;
  label?: string;
  headline?: React.ReactNode;
  body?: string;
};

export function PageIntro({
  dimensionLeft,
  dimensionRight,
  label,
  headline,
  body,
}: Props) {
  return (
    <section className="page-intro container-edge pt-32 md:pt-40 pb-12 md:pb-20">
      {(dimensionLeft || dimensionRight) && (
        <div className="flex items-center justify-between pb-12 md:pb-16">
          {dimensionLeft && <DimensionLabel label={dimensionLeft} />}
          {dimensionRight && (
            <DimensionLabel
              label={dimensionRight}
              className="hidden md:inline-flex"
            />
          )}
        </div>
      )}

      {label && <SectionLabel label={label} />}
      {headline && (
        <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink max-w-[16ch]">
          {headline}
        </h1>
      )}
      {body && (
        <p className="mt-10 max-w-xl text-lg md:text-xl text-ink-2">{body}</p>
      )}
    </section>
  );
}
