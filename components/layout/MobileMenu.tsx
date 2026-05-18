"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navigation, studio } from "@/lib/content";

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

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
          {navigation.map((item) => {
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
            href={studio.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 font-mono-label text-bone"
          >
            Iniciar conversa
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path
                d="M1 7 H13 M8 2 L13 7 L8 12"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
          </a>
          {studio.instagramHandle && (
            <a
              href={studio.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-label text-stone hover:text-ink transition-colors"
            >
              {studio.instagramHandle}
            </a>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
