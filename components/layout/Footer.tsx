import Link from "next/link";
import { CircleMark } from "@/components/ui/CircleMark";
import { Hairline } from "@/components/ui/Hairline";
import {
  navigation as fallbackNav,
  studio as fallbackStudio,
} from "@/lib/content";
import type { Navigation, SiteSettings } from "@/sanity/types";

type Props = {
  navigation?: Navigation | null;
  settings?: SiteSettings | null;
};

export function Footer({ navigation, settings }: Props) {
  const year = new Date().getFullYear();

  const items =
    navigation?.footer?.length
      ? navigation.footer
      : navigation?.primary?.length
        ? navigation.primary
        : fallbackNav;
  const phone = settings?.phone ?? fallbackStudio.phone;
  const phoneHref = settings?.phoneHref ?? fallbackStudio.phoneHref;
  const email = settings?.email ?? fallbackStudio.email;
  const whatsapp = settings?.whatsapp ?? fallbackStudio.whatsapp;
  const instagram = settings?.instagram ?? fallbackStudio.instagram;
  const instagramHandle =
    settings?.instagramHandle ?? fallbackStudio.instagramHandle;
  const cities = settings?.cities ?? fallbackStudio.cities;

  return (
    <footer className="container-edge pb-10 pt-24 md:pt-32">
      <Hairline />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-12">
        <div className="md:col-span-5 flex items-start gap-4">
          <CircleMark className="h-12 w-auto text-caramel-dark" />
          <div>
            <p className="font-display text-2xl leading-tight">
              MM <span className="italic text-caramel-dark">Studio Design</span>
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
            {items.map((item) => (
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
            {phone && (
              <li>
                <a href={phoneHref} className="pretty-link">
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className="pretty-link">
                  {email}
                </a>
              </li>
            )}
            {instagram && (
              <li>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pretty-link"
                >
                  Instagram {instagramHandle ?? ""}
                </a>
              </li>
            )}
            {whatsapp && (
              <li>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pretty-link"
                >
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
        <p className="font-mono-label text-stone">
          © {year} MM Studio Design · Todos os direitos reservados
        </p>
        <p className="font-mono-label text-stone">{cities.join(" · ")}</p>
      </div>
    </footer>
  );
}
