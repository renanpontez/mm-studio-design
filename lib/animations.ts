import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function initLenisOnce() {
  if (typeof window === "undefined") return;
  if (lenisInstance) return;
  if (prefersReducedMotion()) return;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time: number) {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenisInstance.on("scroll", ScrollTrigger.update);
}

export function scrollToTop(immediate = true) {
  if (typeof window === "undefined") return;
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}

function bindRevealOnScroll() {
  const sections = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => section.classList.add("is-revealed"),
    });
  });
}

function bindProjectCardParallax() {
  if (prefersReducedMotion()) return;
  const cards = document.querySelectorAll<HTMLElement>(
    ".project-card .project-image img"
  );
  cards.forEach((img) => {
    const parent = img.closest(".project-image") as HTMLElement | null;
    if (!parent) return;
    gsap.fromTo(
      img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: parent,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}

function bindHeroImageParallax() {
  if (prefersReducedMotion()) return;
  const img = document.querySelector<HTMLElement>(".hero-image");
  if (!img) return;
  gsap.to(img, {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: img.closest("section"),
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

function bindManifestoLighten() {
  const sections = document.querySelectorAll<HTMLElement>(".manifesto-section");
  sections.forEach((section) => {
    const words = section.querySelectorAll<HTMLElement>(".manifesto-word");
    if (words.length === 0) return;
    if (prefersReducedMotion()) {
      words.forEach((w) => (w.style.opacity = "1"));
      return;
    }
    gsap.to(words, {
      opacity: 1,
      ease: "none",
      stagger: { each: 0.04 },
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom 65%",
        scrub: 1,
      },
    });
  });
}

export function rebindScrollAnimations() {
  if (typeof window === "undefined") return;

  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf(".manifesto-word");

  bindRevealOnScroll();
  bindProjectCardParallax();
  bindHeroImageParallax();
  bindManifestoLighten();

  ScrollTrigger.refresh();
}
