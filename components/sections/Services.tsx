"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { cn } from "@/lib/utils";

type ServiceCard = {
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
};

type Props = {
  label?: string;
  heading?: React.ReactNode;
  intro?: string;
  image?: string;
  services?: ServiceCard[];
};

/**
 * MM services — image-left + accordion-right. No hardcoded fallbacks; every
 * piece renders only when supplied by Sanity (or by `page.backup.tsx`).
 */
export function Services({
  label,
  heading,
  intro,
  image,
  services,
}: Props) {
  const [openIndex, setOpenIndex] = useState(0);
  const list = services ?? [];
  if (list.length === 0 && !heading) return null;

  const total = String(list.length).padStart(2, "0");

  return (
    <section id="servicos" className="bg-bone-2 py-24 md:py-32 reveal-on-scroll">
      <div className="container-edge">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            {label && <SectionLabel label={label} />}
            {heading && (
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[18ch] reveal-word">
                {heading}
              </h2>
            )}
          </div>
          {intro && <p className="max-w-sm text-ink-2 fade-up">{intro}</p>}
        </div>

        <div className="mt-16">
          <Hairline reveal />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 items-start">
          {image && (
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-bone md:sticky md:top-24">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {list.length > 0 && (
            <div className={cn(image ? "md:col-span-7" : "md:col-span-12")}>
              <ul className="border-t border-stone/30">
                {list.map((s, i) => {
                  const isOpen = openIndex === i;
                  const ord = String(i + 1).padStart(2, "0");
                  return (
                    <li
                      key={s.slug}
                      className="border-b border-stone/30 fade-up"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className="group flex w-full items-baseline justify-between gap-6 py-7 text-left"
                      >
                        <span className="flex items-baseline gap-5">
                          <span className="font-mono-label text-stone">
                            {ord} / {total}
                          </span>
                          <span className="font-display text-2xl md:text-4xl leading-tight text-ink transition-colors duration-300 group-hover:text-caramel-dark">
                            {s.name}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="relative shrink-0 h-4 w-4 self-center"
                        >
                          <span
                            className={cn(
                              "absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 transition-colors duration-500",
                              isOpen ? "bg-caramel-dark" : "bg-ink/70"
                            )}
                          />
                          <span
                            className={cn(
                              "absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 origin-center transition-[transform,background-color] duration-500",
                              isOpen
                                ? "scale-y-0 bg-caramel-dark"
                                : "scale-y-100 bg-ink/70"
                            )}
                          />
                        </span>
                      </button>

                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-8 md:pl-[5.5rem] max-w-prose">
                            {s.tagline && (
                              <p className="italic text-caramel-dark">
                                {s.tagline}
                              </p>
                            )}
                            {s.description && (
                              <p className="mt-4 text-ink-2 leading-relaxed">
                                {s.description}
                              </p>
                            )}
                            <Link
                              href={`/servicos/${s.slug}`}
                              className="mt-6 inline-flex items-center gap-2 font-mono-label text-ink hover:text-caramel-dark transition-colors duration-300"
                            >
                              Saiba mais
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 10 10"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 5 H9 M6 2 L9 5 L6 8"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  fill="none"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
