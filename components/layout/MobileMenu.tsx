"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { WhatsappIcon } from "@/components/ui/icons/WhatsappIcon";
import { navigation as fallbackNav, studio as fallbackStudio } from "@/lib/content";
import type { Navigation, SiteSettings } from "@/sanity/types";

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

type Props = {
  navigation?: Navigation | null;
  settings?: SiteSettings | null;
};

export function MobileMenu({ navigation, settings }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  const items = navigation?.primary?.length ? navigation.primary : fallbackNav;
  const cta = navigation?.primaryCta;
  const ctaLabel = cta?.label ?? "Iniciar conversa";
  const ctaHref = cta?.href ?? settings?.whatsapp ?? fallbackStudio.whatsapp;
  const instagram = settings?.instagram ?? fallbackStudio.instagram;
  const instagramHandle =
    settings?.instagramHandle ?? fallbackStudio.instagramHandle;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Abrir menu"
        className="md:hidden inline-flex flex-col gap-1.5 p-2"
      >
        <span className="block h-px w-6 bg-ink" />
        <span className="block h-px w-6 bg-ink" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md container-edge flex flex-col"
      >
        <nav
          className="flex-1 flex flex-col items-center justify-center gap-8 text-center"
          aria-label="mobile"
        >
          {items.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-display text-4xl leading-none transition-colors duration-300",
                  active
                    ? "text-caramel-dark italic"
                    : "text-ink hover:text-caramel-dark"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex flex-col items-center gap-4 pb-10">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 font-mono-label text-bone"
          >
            {ctaLabel}
            <WhatsappIcon size={16} />
          </a>
          {instagramHandle && instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-label text-stone hover:text-ink transition-colors"
            >
              {instagramHandle}
            </a>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
