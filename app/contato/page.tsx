import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CircleMark } from "@/components/ui/CircleMark";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import { ContactForm } from "@/components/sections/ContactForm";
import { studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contato · MM Studio Design",
  description:
    "Vamos criar juntas. Conte sobre o seu espaço. Respondemos em até um dia útil.",
};

export default function ContatoPage() {
  return (
    <>
      <section className="page-intro container-edge pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="flex items-center justify-between pb-12 md:pb-16">
          <DimensionLabel label="Resposta em até 1 dia útil" />
          <DimensionLabel
            label={studio.cities.join(" · ")}
            className="hidden md:inline-flex"
          />
        </div>

        <SectionLabel label="Contato" />
        <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-tight text-ink max-w-[14ch]">
          Vamos criar{" "}
          <span className="italic text-caramel-dark">juntas</span>?
        </h1>
        <p className="mt-10 max-w-xl text-lg md:text-xl text-ink-2">
          Estamos prontas para entender suas ideias e trazê-las à vida.
          Conte sobre o seu espaço. Escolha o canal que for mais confortável
          para você.
        </p>
      </section>

      <section className="container-edge py-12 md:py-16 reveal-on-scroll">
        <SectionLabel label="Canais" />
        <div className="mt-10">
          <Hairline reveal />
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-stone/30">
          {[
            {
              label: "WhatsApp",
              value: "Conversa direta",
              href: studio.whatsapp,
              external: true,
            },
            {
              label: "Telefone",
              value: studio.phone,
              href: studio.phoneHref,
              external: false,
            },
            {
              label: "E-mail",
              value: studio.email,
              href: `mailto:${studio.email}`,
              external: false,
              lowercase: true,
            },
            {
              label: "Instagram",
              value: studio.instagramHandle,
              href: studio.instagram,
              external: true,
            },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="group bg-bone p-8 md:p-10 fade-up flex flex-col gap-4 transition-colors duration-500 hover:bg-bone-2"
            >
              <header className="flex items-center justify-between">
                <span className="font-mono-label text-stone">{c.label}</span>
                <CircleMark className="h-8 w-auto text-ink/40 transition-all duration-500 group-hover:text-caramel-dark group-hover:rotate-12" />
              </header>
              <p
                className={`font-display text-xl md:text-2xl text-ink leading-tight ${c.lowercase ? "lowercase" : ""}`}
              >
                {c.value}
              </p>
              <span className="mt-auto font-mono-label text-stone inline-flex items-center gap-2 group-hover:text-ink transition-colors duration-500">
                Abrir
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  aria-hidden="true"
                >
                  <path
                    d="M1 7 H13 M8 2 L13 7 L8 12"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
        <div className="container-edge">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <SectionLabel label="Briefing rápido" />
              <h2 className="mt-6 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[18ch] reveal-word">
                <span>
                  Conta um pouco{" "}
                  <span className="italic text-caramel-dark">sobre o projeto</span>.
                </span>
              </h2>
              <p className="mt-6 text-ink-2 max-w-sm fade-up">
                O formulário abaixo monta uma mensagem completa pra gente. Você
                revisa antes de enviar pelo WhatsApp.
              </p>

              <Hairline className="mt-10 mb-6" />

              <dl className="space-y-4 font-mono-label">
                <div>
                  <dt className="text-stone">Atendimento</dt>
                  <dd className="mt-1 text-ink">Seg a sex · 9h a 18h</dd>
                </div>
                <div>
                  <dt className="text-stone">Resposta média</dt>
                  <dd className="mt-1 text-ink">1 dia útil</dd>
                </div>
              </dl>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
