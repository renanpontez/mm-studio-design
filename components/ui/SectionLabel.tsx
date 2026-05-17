type Props = {
  // `ordinal` is accepted for backwards-compat with Sanity blocks but no longer rendered.
  ordinal?: string;
  label: string;
};

export function SectionLabel({ label }: Props) {
  return (
    <div className="flex items-baseline font-mono-label text-stone">
      <span>{label}</span>
    </div>
  );
}
