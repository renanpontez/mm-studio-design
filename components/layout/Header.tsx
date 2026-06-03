"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { CircleMark } from "@/components/ui/CircleMark";
import { WhatsappIcon } from "@/components/ui/icons/WhatsappIcon";
import { MobileMenu } from "./MobileMenu";
import { studio as fallbackStudio, navigation as fallbackNav } from "@/lib/content";
import type { Navigation, SiteSettings } from "@/sanity/types";

const reveal = (i: number) => ({ "--reveal-i": i } as CSSProperties);

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

type Props = {
  navigation?: Navigation | null;
  settings?: SiteSettings | null;
};

export function Header({ navigation, settings }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = navigation?.primary?.length ? navigation.primary : fallbackNav;
  const cta = navigation?.primaryCta;
  const ctaLabel = cta?.label ?? "Criar juntas";
  const ctaHref = cta?.href ?? settings?.whatsapp ?? fallbackStudio.whatsapp;
  const ctaIsWhatsapp =
    cta?.kind === "whatsapp" || /wa\.me|api\.whatsapp\.com/.test(ctaHref);
  const studioName = settings?.name ?? fallbackStudio.name;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,box-shadow] duration-500",
        scrolled &&
          "bg-bone/70 backdrop-blur-md shadow-[0_1px_0_0_rgba(156,147,132,0.25)]"
      )}
    >
      <div className="container-edge">
        <div className="flex items-center justify-between py-5 md:py-6">
          <Link
            href="/"
            className="nav-reveal group flex items-center gap-3"
            aria-label={studioName}
            style={reveal(1)}
          >
            <CircleMark className="h-8 w-auto text-caramel-dark transition-transform duration-700 group-hover:rotate-6" />
            <span className="font-mono-label !text-[0.7rem] text-ink">
              MM Studio · Design
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-7" aria-label="primary">
              {items.map((item, i) => {
                const active = isNavActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "nav-reveal inline-flex items-baseline font-mono-label transition-colors duration-300",
                      active
                        ? "text-caramel-dark"
                        : "text-ink hover:text-caramel-dark"
                    )}
                    style={reveal(i + 2)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <a
              href={ctaHref}
              target={ctaIsWhatsapp ? "_blank" : undefined}
              rel={ctaIsWhatsapp ? "noopener noreferrer" : undefined}
              className="nav-reveal inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-mono-label text-ink transition-colors duration-500 hover:border-caramel-dark hover:bg-caramel-dark hover:text-bone"
              style={reveal(items.length + 2)}
            >
              {ctaLabel}
              <WhatsappIcon size={14} />
            </a>
          </div>

          <MobileMenu navigation={navigation} settings={settings} />
        </div>
      </div>
    </header>
  );
}
