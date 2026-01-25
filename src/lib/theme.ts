export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

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
}

export function initTheme(): void {
  const stored = getStoredTheme();
  applyTheme(stored ?? getPreferredTheme());
}

export function toggleTheme(): Theme {
  const current =
    getStoredTheme() ??
    (typeof document !== "undefined"
      ? (document.documentElement.dataset["theme"] as Theme | undefined)
      : undefined) ??
    getPreferredTheme();
  const next: Theme = current === "dark" ? "light" : "dark";

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  applyTheme(next);
  return next;
}
