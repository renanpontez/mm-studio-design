import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  stroke?: string;
};

/**
 * MM signature: a single hand-drawn circle with a slight imperfection.
 * Replaces athelie's arch as the recurring brand mark.
 */
export function CircleMark({ className, stroke = "currentColor" }: Props) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("overflow-visible", className)}
      fill="none"
      stroke={stroke}
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* main circle, slightly open + asymmetric to feel hand-drawn */}
      <path d="M 12 38 C 12 18, 30 8, 44 9 C 60 10, 70 24, 70 40 C 70 56, 56 70, 40 70 C 24 70, 13 58, 13 42" />
      {/* a tiny leaf-like stroke crossing the circle, vegetal hint */}
      <path
        d="M 35 50 Q 40 40, 50 38"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
