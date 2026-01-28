import { describe, expect, it } from "vitest";

import {
  getAlternatePaths,
  getLangFromPathname,
  normalizePathname,
  stripLangPrefix,
  toLangPath,
} from "./routes";

describe("i18n routes", () => {
  it("normalizes trailing slashes", () => {
    expect(normalizePathname("/")).toBe("/");
    expect(normalizePathname("/es/")).toBe("/es");
    expect(normalizePathname("/about/")).toBe("/about");
  });

  it("detects language from pathname", () => {
    expect(getLangFromPathname("/")).toBe("en");
    expect(getLangFromPathname("/es")).toBe("es");
    expect(getLangFromPathname("/es/anything")).toBe("es");
    expect(getLangFromPathname("/services")).toBe("en");
  });

  it("strips and adds the /es prefix consistently", () => {
    expect(stripLangPrefix("/es")).toBe("/");
    expect(stripLangPrefix("/es/")).toBe("/");
    expect(stripLangPrefix("/es/about")).toBe("/about");

    expect(toLangPath("/", "en")).toBe("/");
    expect(toLangPath("/", "es")).toBe("/es");

    expect(toLangPath("/about", "es")).toBe("/es/about");
    expect(toLangPath("/es/about", "en")).toBe("/about");
  });

  it("returns alternates for canonical + hreflang", () => {
    expect(getAlternatePaths("/es/about")).toEqual({
      en: "/about",
      es: "/es/about",
      xDefault: "/about",
    });
  });
});
