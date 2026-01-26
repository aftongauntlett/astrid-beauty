import type { Messages } from "./types";
import { en } from "./en";
import { es } from "./es";

export const supportedLangs = ["en", "es"] as const;
export type Lang = (typeof supportedLangs)[number];

export function normalizeLang(input: string | null | undefined): Lang {
	if (!input) return "en";
	const value = input.toLowerCase();
	if (value === "es") return "es";
	return "en";
}

export function getMessages(lang: Lang): Messages {
	return lang === "es" ? es : en;
}
