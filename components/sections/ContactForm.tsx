"use client";

import { useState } from "react";
import { studio } from "@/lib/content";
import { cn } from "@/lib/utils";

const PHONE_E164 = "5585996477447";

const projectTypes = ["Residencial", "Corporativo", "Outro"] as const;
const services = [
  "Consultoria Completa",
  "Projeto de Interiores",
  "Execução de Obras",
  "Ainda não sei",
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState<string>(projectTypes[0]);
  const [service, setService] = useState<string>(services[0]);
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = [
      `Olá, sou ${name || "(sem nome)"}.`,
      `Email: ${email || "(sem email)"}`,
      phone && `Telefone: ${phone}`,
      `Tipo de projeto: ${projectType}`,
      `Serviço de interesse: ${service}`,
      city && `Cidade: ${city}`,
      "",
      message || "(sem mensagem adicional)",
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(text)}`;
    setSubmitted(true);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldBase =
    "w-full bg-transparent border-b border-stone/40 pb-3 pt-1 text-ink placeholder:text-stone/70 focus:border-caramel-dark outline-none transition-colors duration-300";

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8"
    >
      <div className="md:col-span-1">
        <label htmlFor="name" className="font-mono-label text-stone block mb-2">
          Nome *
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldBase}
          placeholder="Seu nome completo"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="email" className="font-mono-label text-stone block mb-2">
          E-mail *
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldBase}
          placeholder="seu@email.com"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="phone" className="font-mono-label text-stone block mb-2">
          Telefone
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={fieldBase}
          placeholder="(00) 00000-0000"
        />
      </div>

      <div className="md:col-span-1">
        <label htmlFor="city" className="font-mono-label text-stone block mb-2">
          Cidade do projeto
        </label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={fieldBase}
          placeholder="Ex.: Fortaleza, CE"
        />
      </div>

      <div className="md:col-span-1">
        <label className="font-mono-label text-stone block mb-3">
          Tipo de projeto
        </label>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setProjectType(t)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono-label transition-colors duration-300",
                projectType === t
                  ? "bg-caramel-dark text-bone border-caramel-dark"
                  : "border-stone/40 text-ink hover:border-caramel-dark"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="md:col-span-1">
        <label className="font-mono-label text-stone block mb-3">
          Serviço de interesse
        </label>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setService(s)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono-label transition-colors duration-300",
                service === s
                  ? "bg-caramel-dark text-bone border-caramel-dark"
                  : "border-stone/40 text-ink hover:border-caramel-dark"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <label
          htmlFor="message"
          className="font-mono-label text-stone block mb-2"
        >
          Mensagem
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(fieldBase, "resize-none")}
          placeholder="Conte um pouco sobre o seu espaço, prazos e referências..."
        />
      </div>

      <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-6 pt-4">
        <p className="font-mono-label text-stone max-w-sm">
          Ao enviar, abrimos uma conversa direta no WhatsApp com sua mensagem
          já preenchida.
        </p>
        <button
          type="submit"
          className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm tracking-wide text-bone transition-colors duration-500 hover:bg-caramel-dark"
        >
          <span className="font-mono-label !tracking-[0.16em]">
            {submitted ? "Reenviar conversa" : "Iniciar conversa"}
          </span>
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
        </button>
      </div>

      {submitted && (
        <p className="md:col-span-2 font-mono-label text-caramel-dark">
          Tudo certo. Se o WhatsApp não abriu automaticamente,{" "}
          <a
            href={studio.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            clique aqui
          </a>
          .
        </p>
      )}
    </form>
  );
}
