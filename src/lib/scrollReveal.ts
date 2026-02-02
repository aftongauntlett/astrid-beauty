type ScrollRevealOptions = {
  selector?: string;
  revealedClass?: string;
  rootMargin?: string;
  threshold?: number | number[];
};

const DEFAULTS: Required<ScrollRevealOptions> = {
  selector: "[data-reveal]",
  revealedClass: "is-revealed",
  rootMargin: "0px 0px 5% 0px",
  threshold: 0.08,
};

const getDelayMs = (el: HTMLElement): number | null => {
  const raw = el.getAttribute("data-reveal-delay");
  if (!raw) return null;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return null;
  return Math.max(0, parsed);
};

export const initScrollReveal = (options?: ScrollRevealOptions): void => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const isSmallScreen =
    window.matchMedia?.("(max-width: 48rem)").matches ?? false;

  const selector = options?.selector ?? DEFAULTS.selector;
  const revealedClass = options?.revealedClass ?? DEFAULTS.revealedClass;
  const rootMargin =
    options?.rootMargin ??
    (isSmallScreen ? "0px 0px 10% 0px" : DEFAULTS.rootMargin);
  const threshold =
    options?.threshold ?? (isSmallScreen ? 0.05 : DEFAULTS.threshold);

  const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (elements.length === 0) return;

  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  if (prefersReducedMotion) {
    for (const el of elements) el.classList.add(revealedClass);
    return;
  }

  if (!("IntersectionObserver" in window)) {
    for (const el of elements) el.classList.add(revealedClass);
    return;
  }

  for (const el of elements) {
    const delay = getDelayMs(el);
    if (delay !== null) el.style.setProperty("--reveal-delay", `${delay}ms`);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add(revealedClass);
        observer.unobserve(el);
      }
    },
    { root: null, rootMargin, threshold },
  );

  for (const el of elements) {
    if (el.classList.contains(revealedClass)) continue;
    observer.observe(el);
  }
};
