type Props = {
  ordinal: string;
  label: string;
};

export function SectionLabel({ ordinal, label }: Props) {
  return (
    <div className="flex items-baseline gap-3 font-mono-label text-stone">
      <span className="text-ink-2">{ordinal}</span>
      <span className="h-px w-8 bg-stone/60" />
      <span>{label}</span>
    </div>
  );
}
