/**
 * BACKUP REFERENCE: original static homepage before Sanity took over.
 * Renders the 7 sections with explicit props sourced from lib/content.ts.
 * Use this file as the visual reference for what each section should look
 * like when fully populated. Next.js does NOT route this file because the
 * filename isn't `page.tsx`.
 */
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Founders } from "@/components/sections/Founders";
import { Process } from "@/components/sections/Process";
import { ContactCTA } from "@/components/sections/ContactCTA";
import {
  studio,
  navigation as _nav,
  heroFeature,
  projects,
  services,
  founders,
  foundersPortrait,
  processSteps,
} from "@/lib/content";

const HERO_HEADLINE = (
  <>
    <span className="reveal-word">
      <span>Espaços que</span>
    </span>
    <span className="block italic text-caramel-dark reveal-word">
      <span>respiram</span>
    </span>
    <span className="block reveal-word">
      <span>sua história.</span>
    </span>
  </>
);

// Mirrors the new richHeadline portable-text shape so the manifesto reveal
// animation runs identically to the Sanity-driven path.
const MANIFESTO_BODY = [
  {
    _type: "block" as const,
    children: [
      { _type: "span" as const, text: "Cada projeto é uma maneira de criar " },
      {
        _type: "span" as const,
        text: "lugares vivos, conscientes",
        marks: ["italicAccent"],
      },
      { _type: "span" as const, text: " e feitos para acolher quem os habita." },
    ],
  },
];

export default function StaticHomePage() {
  return (
    <>
      <Hero
        eyebrow="Estúdio de design de interiores"
        headline={HERO_HEADLINE}
        body="Design de interiores residencial e corporativo em Fortaleza, com olhar sustentável e a sensibilidade de duas amigas que projetam juntas."
        ctaPrimary={{ label: "Ver portfolio", href: "#portfolio" }}
        ctaSecondary={{
          label: "Conversar",
          href: studio.whatsapp,
          external: true,
        }}
        feature={heroFeature}
      />

      <Manifesto label="Manifesto" body={MANIFESTO_BODY} />

      <FeaturedProjects
        label="Portfolio em destaque"
        heading={
          <span>
            Casas e salas feitas{" "}
            <span className="italic text-caramel-dark">com cuidado</span>.
          </span>
        }
        projects={projects.slice(0, 4)}
        viewAllHref="/portfolio"
        viewAllLabel="Ver portfolio completo"
      />

      <Services
        label="Serviços"
        heading={
          <span>
            Três jeitos de tirar a ideia{" "}
            <span className="italic text-caramel-dark">do papel</span>.
          </span>
        }
        intro="Da consultoria pontual à execução completa. Escolhemos juntos o formato que melhor se adapta ao seu projeto."
        services={services.map((s) => ({
          slug: s.slug,
          name: s.name,
          tagline: s.tagline,
          description: s.description,
        }))}
      />

      <Founders
        label="A dupla MM"
        heading={
          <span>
            Duas amigas, dois olhares,{" "}
            <span className="italic text-caramel-dark">um estúdio</span>.
          </span>
        }
        intro="Acreditamos que cada espaço carrega uma história. O nosso papel é escutar essa história e devolvê-la em forma de ambiente."
        portrait={foundersPortrait}
        founders={founders}
      />

      <Process
        label="Processo"
        heading={<span>Como caminhamos juntas, do briefing às chaves.</span>}
        steps={processSteps}
      />

      <ContactCTA
        label="Contato"
        heading={
          <span>
            Vamos criar{" "}
            <span className="italic text-caramel-dark">juntas</span>?
          </span>
        }
        intro="Estamos prontas para entender suas ideias e trazê-las à vida. Conte sobre o seu espaço, respondemos em até um dia útil."
        ctaPrimaryLabel="Iniciar conversa"
        ctaSecondaryLabel="Enviar e-mail"
        contact={studio}
      />
    </>
  );
}
