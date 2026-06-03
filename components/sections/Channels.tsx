import { SectionLabel } from "@/components/ui/SectionLabel";

type ChannelName = "whatsapp" | "phone" | "email" | "instagram";

type Channel = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

type Settings = {
  whatsapp?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  instagram?: string;
  instagramHandle?: string;
};

type Props = {
  label?: string;
  channels?: ChannelName[];
  settings?: Settings | null;
};

function resolveChannel(
  name: ChannelName,
  s: Settings | null | undefined
): Channel | null {
  if (!s) return null;
  switch (name) {
    case "whatsapp":
      return s.whatsapp
        ? { label: "WhatsApp", value: "Conversa direta", href: s.whatsapp, external: true }
        : null;
    case "phone":
      return s.phone
        ? { label: "Telefone", value: s.phone, href: s.phoneHref ?? `tel:${s.phone.replace(/\D/g, "")}` }
        : null;
    case "email":
      return s.email
        ? { label: "E-mail", value: s.email, href: `mailto:${s.email}` }
        : null;
    case "instagram":
      return s.instagram
        ? {
            label: "Instagram",
            value: s.instagramHandle ?? s.instagram,
            href: s.instagram,
            external: true,
          }
        : null;
  }
}

export function Channels({ label, channels, settings }: Props) {
  const order = channels ?? ["whatsapp", "phone", "email", "instagram"];
  const resolved = order
    .map((n) => resolveChannel(n, settings))
    .filter((c): c is Channel => c !== null);
  if (resolved.length === 0) return null;

  return (
    <section className="container-edge py-12 md:py-16 reveal-on-scroll">
      {label && <SectionLabel label={label} />}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-stone/30">
        {resolved.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noopener noreferrer" : undefined}
            className="bg-bone p-8 md:p-10 flex items-center justify-between gap-6 hover:bg-bone-2 transition-colors duration-500 group"
          >
            <div>
              <p className="font-mono-label text-stone">{c.label}</p>
              <p className="mt-2 font-display text-2xl md:text-3xl text-ink">
                {c.value}
              </p>
            </div>
            <span className="font-mono-label text-stone inline-flex items-center gap-2 group-hover:text-caramel-dark transition-colors">
              Abrir
              <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M1 7 H13 M8 2 L13 7 L8 12"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
