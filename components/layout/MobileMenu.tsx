"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigation, studio } from "@/lib/content";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Abrir menu"
        className="md:hidden inline-flex flex-col gap-1.5 p-2"
      >
        <span className="block h-px w-6 bg-ink" />
        <span className="block h-px w-6 bg-ink" />
      </SheetTrigger>
      <SheetContent side="right" className="container-edge pt-24">
        <nav className="flex flex-col gap-6" aria-label="mobile">
          {navigation.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-stone/30 pb-4 text-3xl font-display"
            >
              <span className="font-mono-label text-stone">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={studio.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 font-mono-label text-bone"
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
      </SheetContent>
    </Sheet>
  );
}
