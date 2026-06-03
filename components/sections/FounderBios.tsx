import { CircleMark } from "@/components/ui/CircleMark";

type Founder = { name: string; role?: string; bio?: string };

type Props = { founders?: Founder[] };

export function FounderBios({ founders }: Props) {
  if (!founders || founders.length === 0) return null;
  return (
    <section className="container-edge py-16 md:py-24 reveal-on-scroll">
      <div className="space-y-16 md:space-y-20">
        {founders.map((f, i) => (
          <article
            key={`${f.name}-${i}`}
            className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10 items-start fade-up"
          >
            <div className="md:col-span-3">
              <CircleMark className="h-24 w-24 text-caramel-dark/60" />
              {f.role && (
                <p className="mt-4 font-mono-label text-stone">{f.role}</p>
              )}
            </div>
            <div className="md:col-span-9 md:pl-4">
              <h3 className="font-display text-4xl md:text-5xl leading-tight text-ink">
                {f.name}
              </h3>
              {f.bio && (
                <p className="mt-5 text-ink-2 text-lg leading-relaxed max-w-2xl">
                  {f.bio}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
