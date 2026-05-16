import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTA } from "@/components/ui/CTA";

export default function NotFound() {
  return (
    <section className="container-edge pt-40 pb-24 min-h-[70svh] flex flex-col items-start justify-center">
      <SectionLabel ordinal="04" label="404" />
      <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-ink max-w-[16ch]">
        Esse serviço não foi{" "}
        <span className="italic text-caramel-dark">encontrado</span>.
      </h1>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <CTA href="/servicos" variant="primary">
          Ver serviços
        </CTA>
        <Link href="/" className="pretty-link font-mono-label text-ink">
          Voltar para o início
        </Link>
      </div>
    </section>
  );
}
