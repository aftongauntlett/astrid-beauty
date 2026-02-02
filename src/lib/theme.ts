export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function emitThemeChange(theme: Theme): void {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  } catch {
    // ignore
  }
}

export function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset["theme"] = theme;
  document.documentElement.style.colorScheme = theme;
}

export function setTheme(theme: Theme): void {
  if (typeof document !== "undefined") {
    document.documentElement.classList.add("theme-changing");
  }

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }

  applyTheme(theme);
  emitThemeChange(theme);

  if (typeof document !== "undefined") {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("theme-changing");
      });
    });
  }
}

export function initTheme(): void {
  const stored = getStoredTheme();
  const next = stored ?? getPreferredTheme();
  applyTheme(next);
  emitThemeChange(next);
}

export function toggleTheme(): Theme {
  const current =
    getStoredTheme() ??
    (typeof document !== "undefined"
      ? (document.documentElement.dataset["theme"] as Theme | undefined)
      : undefined) ??
    getPreferredTheme();
  const next: Theme = current === "dark" ? "light" : "dark";

  setTheme(next);
  return next;
}
