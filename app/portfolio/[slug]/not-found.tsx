import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTA } from "@/components/ui/CTA";

export default function NotFound() {
  return (
    <section className="container-edge pt-40 pb-24 min-h-[70svh] flex flex-col items-start justify-center">
      <SectionLabel ordinal="04" label="404" />
      <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-ink max-w-[16ch]">
        Esse projeto não foi{" "}
        <span className="italic text-moss-dark">encontrado</span>.
      </h1>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <CTA href="/portfolio" variant="primary">
          Ver portfolio
        </CTA>
        <Link href="/" className="pretty-link font-mono-label text-ink">
          Voltar para o início
        </Link>
      </div>
    </section>
  );
}
