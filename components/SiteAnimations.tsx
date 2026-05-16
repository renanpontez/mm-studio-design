"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  initLenisOnce,
  rebindScrollAnimations,
  scrollToTop,
} from "@/lib/animations";

export function SiteAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    initLenisOnce();
  }, []);

  useEffect(() => {
    scrollToTop(true);
    const id = requestAnimationFrame(() => {
      rebindScrollAnimations();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
