import type { Lang } from "./index";

const ensureLeadingSlash = (value: string) =>
  value.startsWith("/") ? value : `/${value}`;

export function normalizePathname(pathname: string): string {
  const withSlash = ensureLeadingSlash(pathname || "/");
  // Collapse trailing slash (except root)
  if (withSlash.length > 1 && withSlash.endsWith("/"))
    return withSlash.slice(0, -1);
  return withSlash;
}

export function getLangFromPathname(pathname: string): Lang {
  const path = normalizePathname(pathname);
  return path === "/es" || path.startsWith("/es/") ? "es" : "en";
}

export function stripLangPrefix(pathname: string): string {
  const path = normalizePathname(pathname);
  if (path === "/es") return "/";
  if (path.startsWith("/es/")) return path.slice(3) || "/";
  return path;
}

export function toLangPath(pathname: string, lang: Lang): string {
  const base = stripLangPrefix(pathname);
  if (lang === "en") return normalizePathname(base);
  if (base === "/") return "/es";
  return normalizePathname(`/es${base}`);
}

export function getAlternatePaths(pathname: string): {
  en: string;
  es: string;
  xDefault: string;
} {
  return {
    en: toLangPath(pathname, "en"),
    es: toLangPath(pathname, "es"),
    xDefault: toLangPath(pathname, "en"),
  };
}
