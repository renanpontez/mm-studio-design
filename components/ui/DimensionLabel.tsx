import { cn } from "@/lib/utils";

type Props = {
  label: string;
  className?: string;
};

export function DimensionLabel({ label, className }: Props) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono-label text-stone",
        className
      )}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <path
          d="M0 5 L10 5 M0 1 L0 9 M10 1 L10 9"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <span>{label}</span>
    </div>
  );
}
