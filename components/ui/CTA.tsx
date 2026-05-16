import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  variant?: "primary" | "ghost" | "underline";
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
      className="transition-transform duration-500 group-hover:translate-x-1"
    >
      <path
        d="M1 7 H13 M8 2 L13 7 L8 12"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  );
}

export function CTA({
  href,
  variant = "primary",
  external = false,
  className,
  children,
}: Props) {
  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener noreferrer" : undefined;
  const Component = external ? "a" : Link;

  if (variant === "primary") {
    return (
      <Component
        href={href}
        target={target}
        rel={rel}
        className={cn(
          "group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm tracking-wide text-bone transition-colors duration-500 hover:bg-moss-dark",
          className
        )}
      >
        <span className="font-mono-label !tracking-[0.16em]">{children}</span>
        <Arrow />
      </Component>
    );
  }

  if (variant === "ghost") {
    return (
      <Component
        href={href}
        target={target}
        rel={rel}
        className={cn(
          "group inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-3.5 text-sm tracking-wide text-ink transition-all duration-500 hover:border-ink hover:bg-ink hover:text-bone",
          className
        )}
      >
        <span className="font-mono-label !tracking-[0.16em]">{children}</span>
        <Arrow />
      </Component>
    );
  }

  return (
    <Component
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "pretty-link inline-flex items-center gap-2 font-mono-label text-ink",
        className
      )}
    >
      {children}
      <Arrow />
    </Component>
  );
}
