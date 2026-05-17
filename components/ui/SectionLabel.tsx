type Props = {
  label: string;
};

export function SectionLabel({ label }: Props) {
  return (
    <div className="flex items-baseline font-mono-label text-stone">
      <span>{label}</span>
    </div>
  );
}
