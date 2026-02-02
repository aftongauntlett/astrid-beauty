type FooterGlobal = typeof globalThis & {
  __astrid_footerController?: AbortController;
};

export const initFooter = () => {
  const g = globalThis as FooterGlobal;

  g.__astrid_footerController?.abort?.();
  const controller = new AbortController();
  g.__astrid_footerController = controller;
  const { signal } = controller;

  document.addEventListener("astro:before-swap", () => controller.abort(), {
    once: true,
    signal,
  });

  // Prefer Apple Maps on Apple devices.
  const link = document.querySelector("[data-apple-maps-href]");
  if (link instanceof HTMLAnchorElement) {
    try {
      const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
      if (isApple) {
        const appleHref = link.getAttribute("data-apple-maps-href");
        if (appleHref) link.href = appleHref;
      }
    } catch {
      // ignore
    }
  }

  // Smooth-scroll back to top.
  const toTop = document.querySelector(".site-footer__toTop");
  if (toTop instanceof HTMLAnchorElement) {
    toTop.addEventListener(
      "click",
      (event) => {
        try {
          event.preventDefault();
          const reduce = window.matchMedia?.(
            "(prefers-reduced-motion: reduce)",
          )?.matches;
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
          const url = new URL(window.location.href);
          url.hash = "#top";
          history.pushState({}, "", url);
        } catch {
          // ignore
        }
      },
      { signal },
    );
  }
};
