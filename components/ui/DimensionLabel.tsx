import { cn } from "@/lib/utils";

type Props = {
  label: string;
  className?: string;
};

export function DimensionLabel({ label, className }: Props) {
  return (
    <div
      className={cn("inline-flex items-center font-mono-label text-stone", className)}
    >
      <span>{label}</span>
    </div>
  );
}
