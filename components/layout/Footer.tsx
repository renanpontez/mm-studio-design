import Link from "next/link";
import { CircleMark } from "@/components/ui/CircleMark";
import { Hairline } from "@/components/ui/Hairline";
import { navigation, studio } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="container-edge pb-10 pt-24 md:pt-32">
      <Hairline />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-12">
        <div className="md:col-span-5 flex items-start gap-4">
          <CircleMark className="h-12 w-auto text-moss-dark" />
          <div>
            <p className="font-display text-2xl leading-tight">
              MM <span className="italic text-moss-dark">Studio Design</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-ink-2">
              Estamos prontas para entender suas ideias e trazê-las à vida.
              Vamos fazer algo especial juntas.
            </p>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono-label text-stone">Navegação</p>
          <ul className="mt-4 space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="pretty-link text-ink text-sm">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono-label text-stone">Contato</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={studio.phoneHref} className="pretty-link">
                {studio.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${studio.email}`} className="pretty-link">
                {studio.email}
              </a>
            </li>
            <li>
              <a
                href={studio.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="pretty-link"
              >
                Instagram {studio.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={studio.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="pretty-link"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
        <p className="font-mono-label text-stone">
          © {year} MM Studio Design · Todos os direitos reservados
        </p>
        <p className="font-mono-label text-stone">
          {studio.cities.join(" · ")}
        </p>
      </div>
    </footer>
  );
}
