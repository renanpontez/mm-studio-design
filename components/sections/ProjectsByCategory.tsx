import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Project = {
  slug: string;
  name: string;
  year?: number;
  image?: string;
  imageAlt?: string;
  summary?: string;
};

type Category = {
  slug: string;
  name: string;
  projects?: Project[];
};

type Props = {
  showAnchorNav?: boolean;
  categories?: Category[];
};

export function ProjectsByCategory({ showAnchorNav, categories }: Props) {
  const list = (categories ?? []).filter(
    (c) => (c.projects ?? []).length > 0
  );
  if (list.length === 0) return null;

  return (
    <>
      {showAnchorNav && (
        <nav className="container-edge -mt-4 mb-4 flex flex-wrap items-center gap-2 font-mono-label">
          <span className="text-stone mr-2">Categorias:</span>
          {list.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-ink hover:border-caramel-dark hover:bg-caramel-dark hover:text-bone transition-colors duration-500"
            >
              {cat.name}
            </a>
          ))}
        </nav>
      )}

      {list.map((cat) => (
        <section
          key={cat.slug}
          id={cat.slug}
          className="container-edge py-16 md:py-24 reveal-on-scroll"
        >
          <div className="flex items-end justify-between flex-wrap gap-6">
            <SectionLabel label={cat.name} />
            <span className="font-mono-label text-stone">
              {String((cat.projects ?? []).length).padStart(2, "0")} projeto
              {(cat.projects ?? []).length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {(cat.projects ?? []).map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="project-card group block fade-up"
              >
                <div className="project-image relative overflow-hidden bg-bone-2 rounded-[8px] aspect-[4/3]">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.imageAlt ?? ""}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono-label text-stone">
                      {cat.name}
                      {p.year ? ` · ${p.year}` : ""}
                    </p>
                    <h3 className="mt-2 font-display text-2xl md:text-3xl leading-tight text-ink">
                      {p.name}
                    </h3>
                  </div>
                </div>
                {p.summary && (
                  <p className="mt-3 text-ink-2 max-w-md">{p.summary}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
