/**
 * MM Studio Design — seeds the page-builder docs for the 4 internal routes
 * AND backfills the projectCategory references on existing project docs.
 *
 * Idempotent:
 *   - projectCategory docs: createOrReplace by deterministic _id
 *   - project.category patch: only runs when category is still a string (or
 *     a reference to a non-existent doc); skips already-correct refs
 *   - page docs: createIfNotExists by default. Pass --force to overwrite.
 *
 * Usage:
 *   cd site && set -a && . ./.env.local && set +a && npx tsx scripts/migrate-pages.ts
 *   cd site && set -a && . ./.env.local && set +a && npx tsx scripts/migrate-pages.ts --force
 *   cd site && ... npx tsx scripts/migrate-pages.ts --dry-run
 */
import { createClient, type SanityDocument } from "@sanity/client";
import { randomBytes } from "node:crypto";
import {
  studio,
  projects,
  founders,
  pillars,
  processSteps,
  services,
  categoryLabels,
} from "../lib/content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_WRITE_TOKEN (Editor role)");

const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");
const DRY = args.has("--dry-run");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

/* ---------- helpers ---------- */

const k = () => randomBytes(6).toString("hex");
const id = (prefix: string, slug: string) =>
  `${prefix}.${slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase()}`;

function richHeadline(text: string, italicWords: string[] = []) {
  // Build a single PT block with italicAccent marks on matching substrings.
  // Keeps editor edits intact; the renderer turns italicAccent into <em>.
  if (italicWords.length === 0) {
    return [
      {
        _key: k(),
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [{ _key: k(), _type: "span", text, marks: [] }],
      },
    ];
  }
  const re = new RegExp(`(${italicWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = text.split(re).filter((s) => s.length > 0);
  return [
    {
      _key: k(),
      _type: "block",
      style: "normal",
      markDefs: [],
      children: parts.map((p) => ({
        _key: k(),
        _type: "span",
        text: p,
        marks: italicWords.includes(p) ? ["italicAccent"] : [],
      })),
    },
  ];
}

async function upsert(doc: SanityDocument & { _id: string; _type: string }) {
  if (DRY) {
    console.log(`  [dry] createOrReplace ${doc._type} · ${doc._id}`);
    return;
  }
  await client.createOrReplace(doc);
  console.log(`  ✓ ${doc._type} · ${doc._id}`);
}

async function createIfNotExists(
  doc: SanityDocument & { _id: string; _type: string }
) {
  const existing = await client.getDocument(doc._id);
  if (existing && !FORCE) {
    console.log(
      `  · ${doc._type} · ${doc._id} already exists — skipping (use --force to overwrite)`
    );
    return;
  }
  if (DRY) {
    console.log(
      `  [dry] ${existing ? "createOrReplace" : "create"} ${doc._type} · ${doc._id}`
    );
    return;
  }
  if (existing) {
    await client.createOrReplace(doc);
    console.log(`  ✓ ${doc._type} · ${doc._id} (forced overwrite)`);
  } else {
    await client.create(doc);
    console.log(`  ✓ ${doc._type} · ${doc._id} (new)`);
  }
}

const ref = (id: string) => ({ _type: "reference" as const, _ref: id });

/* ---------- 1) project categories ---------- */

type CategorySeed = { slug: string; name: string; order: number };

const CATEGORY_SEEDS: CategorySeed[] = [
  { slug: "residencial", name: "Residencial", order: 0 },
  { slug: "corporativo", name: "Corporativo", order: 1 },
  { slug: "comercial", name: "Comercial", order: 2 },
];

async function seedCategories() {
  console.log("\n[1/3] Project categories:");
  for (const c of CATEGORY_SEEDS) {
    await upsert({
      _id: id("category", c.slug),
      _type: "projectCategory",
      name: c.name,
      slug: { _type: "slug", current: c.slug },
      order: c.order,
    });
  }
}

/* ---------- 2) backfill project.category (string → reference) ---------- */

async function patchProjectCategories() {
  console.log("\n[2/3] Patching project.category on published + drafts:");

  // Find every project where category is still a string OR a reference to a
  // doc that no longer exists. Covers both published and draft IDs.
  const docs: { _id: string; _rev: string; categoryRaw: unknown; slug: string }[] =
    await client.fetch(
      `*[_type == "project"]{
         _id, _rev,
         "categoryRaw": category,
         "slug": slug.current
       }`
    );

  for (const d of docs) {
    const raw = d.categoryRaw as
      | string
      | { _type?: string; _ref?: string }
      | undefined;
    let targetSlug: string | undefined;

    if (typeof raw === "string") {
      targetSlug = raw;
    } else if (raw && typeof raw === "object" && raw._ref) {
      // Already a reference — only patch if it points to a missing doc
      const exists = await client.getDocument(raw._ref);
      if (exists) {
        console.log(`  · ${d._id} already references ${raw._ref} — skip`);
        continue;
      }
      // ref is dangling — fall back to detection by slug if possible
      targetSlug = raw._ref.replace(/^category\./, "");
    } else {
      console.log(`  ? ${d._id} has no category — skipping`);
      continue;
    }

    const refId = id("category", targetSlug);
    const seededSlugs = new Set(CATEGORY_SEEDS.map((c) => c.slug));
    // In dry-run mode the categories haven't actually been written, so trust
    // the seed list. Outside dry-run, also accept seeded slugs because they
    // will exist after phase 1 (this script runs phases in order).
    const targetExists =
      seededSlugs.has(targetSlug) || (await client.getDocument(refId));
    if (!targetExists) {
      console.log(
        `  ! ${d._id} → category "${targetSlug}" has no matching projectCategory doc (${refId}). Add a seed for it. Skipping.`
      );
      continue;
    }

    if (DRY) {
      console.log(`  [dry] patch ${d._id} category → ref(${refId})`);
      continue;
    }
    await client.patch(d._id).set({ category: ref(refId) }).commit();
    console.log(`  ✓ ${d._id} category → ref(${refId})`);
  }
}

/* ---------- 3) page docs ---------- */

function projectRef(slug: string) {
  return ref(id("project", slug));
}
function founderRef(name: string) {
  return ref(id("founder", name.toLowerCase().replace(/\s+/g, "-")));
}
function pillarRef(name: string) {
  return ref(id("pillar", name.toLowerCase().replace(/\s+/g, "-")));
}
function serviceRef(slug: string) {
  return ref(id("service", slug));
}
function categoryRef(slug: string) {
  return ref(id("category", slug));
}

async function seedPages() {
  console.log("\n[3/3] Page docs:");

  /* ----- /sobre ----- */
  await createIfNotExists({
    _id: id("page", "sobre"),
    _type: "page",
    title: "Sobre",
    slug: { _type: "slug", current: "sobre" },
    sections: [
      {
        _key: k(),
        _type: "pageIntroSection",
        dimensionLeft: "Est. 2020 · Fortaleza",
        dimensionRight: "Design de interiores",
        label: "Sobre",
        headline: richHeadline(
          "Duas amigas, dois olhares, um estúdio.",
          ["um estúdio"]
        ),
        body: "MM Studio Design nasceu da amizade entre Marly Martins e Emilly Lorrany, duas profissionais apaixonadas por transformar espaços. O estúdio combina olhar sustentável e inovação de processo.",
      },
      {
        _key: k(),
        _type: "manifestoSection",
        label: "Manifesto",
        body: richHeadline(
          "Cada projeto é uma maneira de criar lugares vivos, conscientes e feitos para acolher quem os habita.",
          ["lugares vivos, conscientes"]
        ),
      },
      {
        _key: k(),
        _type: "foundersSection",
        label: "Sobre Nós",
        heading: richHeadline(
          "Sustentabilidade e sensibilidade em cada decisão.",
          ["sensibilidade"]
        ),
        intro:
          "Marly traz o olhar sustentável e a precisão técnica. Emilly traz a inovação de processo e a tradução da vontade do cliente. Juntas, equilibram cada projeto entre intenção e execução.",
        founders: founders.map((f, i) => ({ _key: `f-${i}`, ...founderRef(f.name) })),
      },
      {
        _key: k(),
        _type: "founderBiosSection",
        founders: founders.map((f, i) => ({ _key: `fb-${i}`, ...founderRef(f.name) })),
      },
      {
        _key: k(),
        _type: "pillarsSection",
        label: "Valores",
        heading: richHeadline("Três pilares de cada projeto."),
        pillars: pillars.map((p, i) => ({ _key: `p-${i}`, ...pillarRef(p.name) })),
      },
      {
        _key: k(),
        _type: "processSection",
        label: "Processo",
        heading: richHeadline("Como caminhamos juntas."),
        steps: processSteps.map((s) => ({
          _key: k(),
          name: s.name,
          description: s.description,
        })),
      },
      {
        _key: k(),
        _type: "contactCtaSection",
        heading: richHeadline("Vamos criar juntas?", ["juntas"]),
        ctaPrimary: {
          _type: "cta",
          label: "Iniciar conversa",
          kind: "whatsapp",
          href: studio.whatsapp,
          variant: "primary",
        },
        ctaSecondary: {
          _type: "cta",
          label: "Ver portfolio",
          kind: "internal",
          href: "/portfolio",
          variant: "ghost",
        },
      },
    ],
  });

  /* ----- /servicos ----- */
  await createIfNotExists({
    _id: id("page", "servicos"),
    _type: "page",
    title: "Serviços",
    slug: { _type: "slug", current: "servicos" },
    sections: [
      {
        _key: k(),
        _type: "pageIntroSection",
        dimensionLeft: `${services.length} serviços`,
        dimensionRight: studio.cities.join(" · "),
        label: "Serviços",
        headline: richHeadline(
          "Três jeitos de tirar a ideia do papel.",
          ["do papel"]
        ),
        body:
          "Da consultoria pontual ao acompanhamento integral de obra. Escolhemos juntas o formato que melhor se adapta ao seu projeto.",
      },
      {
        _key: k(),
        _type: "servicesDetailedSection",
        label: "Em detalhe",
        services: services.map((s, i) => ({ _key: `sd-${i}`, ...serviceRef(s.slug) })),
      },
      {
        _key: k(),
        _type: "contactCtaSection",
        heading: richHeadline("Não sabe qual se encaixa?", ["se encaixa"]),
        ctaPrimary: {
          _type: "cta",
          label: "Conversar",
          kind: "whatsapp",
          href: studio.whatsapp,
          variant: "primary",
        },
        ctaSecondary: {
          _type: "cta",
          label: "Enviar mensagem",
          kind: "internal",
          href: "/contato",
          variant: "ghost",
        },
      },
    ],
  });

  /* ----- /portfolio ----- */
  await createIfNotExists({
    _id: id("page", "portfolio"),
    _type: "page",
    title: "Portfolio",
    slug: { _type: "slug", current: "portfolio" },
    sections: [
      {
        _key: k(),
        _type: "pageIntroSection",
        dimensionLeft: `${projects.length} projetos`,
        dimensionRight: "Fortaleza · CE",
        label: "Portfolio",
        headline: richHeadline(
          "Cada espaço tem sua história.",
          ["sua história"]
        ),
        body:
          "Projetos residenciais e corporativos desenvolvidos pelo estúdio. Cada um com seu desafio, sua paleta e sua atmosfera.",
      },
      {
        _key: k(),
        _type: "projectsByCategorySection",
        showAnchorNav: true,
        categories: [
          { _key: "c-residencial", ...categoryRef("residencial") },
          { _key: "c-corporativo", ...categoryRef("corporativo") },
        ],
      },
    ],
  });

  /* ----- /contato ----- */
  await createIfNotExists({
    _id: id("page", "contato"),
    _type: "page",
    title: "Contato",
    slug: { _type: "slug", current: "contato" },
    sections: [
      {
        _key: k(),
        _type: "pageIntroSection",
        dimensionLeft: "Resposta em até 1 dia útil",
        dimensionRight: studio.cities.join(" · "),
        label: "Contato",
        headline: richHeadline("Vamos criar juntas?", ["juntas"]),
        body:
          "Estamos prontas para entender suas ideias e trazê-las à vida. Conte sobre o seu espaço. Escolha o canal que for mais confortável para você.",
      },
      {
        _key: k(),
        _type: "channelsSection",
        label: "Canais",
        channels: ["whatsapp", "phone", "email", "instagram"],
      },
      {
        _key: k(),
        _type: "briefingFormSection",
        label: "Briefing rápido",
        heading: richHeadline(
          "Conta um pouco sobre o projeto.",
          ["sobre o projeto"]
        ),
        intro:
          "O formulário abaixo monta uma mensagem completa pra gente. Você revisa antes de enviar pelo WhatsApp.",
        metadata: [
          { label: "Atendimento", value: "Seg a sex · 9h a 18h" },
          { label: "Resposta média", value: "1 dia útil" },
        ],
      },
    ],
  });
}

/* ---------- 4) navigation primaryCta ---------- */

async function ensureNavigationCta() {
  console.log("\n[4/4] Navigation primary CTA:");
  const nav = await client.getDocument("navigation");
  if (!nav) {
    console.log("  ? navigation doc not found — skip (run migrate-to-sanity first)");
    return;
  }
  // @ts-expect-error sanity doc shape isn't typed at runtime
  if (nav.primaryCta && !FORCE) {
    console.log("  · primaryCta already set — skip (use --force to overwrite)");
    return;
  }
  const primaryCta = {
    _type: "cta",
    label: "Criar juntas",
    kind: "whatsapp" as const,
    href: studio.whatsapp,
    variant: "primary" as const,
  };
  if (DRY) {
    console.log("  [dry] patch navigation.primaryCta");
    return;
  }
  await client.patch("navigation").set({ primaryCta }).commit();
  console.log("  ✓ navigation.primaryCta set");
}

/* ---------- entry ---------- */

async function main() {
  console.log(`→ Migrating pages → ${projectId}/${dataset}${DRY ? " (dry-run)" : ""}${FORCE ? " (force)" : ""}`);
  console.log(`  Sample categoryLabels keys for sanity: ${Object.keys(categoryLabels).join(", ")}`);
  await seedCategories();
  await patchProjectCategories();
  await seedPages();
  await ensureNavigationCta();
  console.log("\n✓ Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
