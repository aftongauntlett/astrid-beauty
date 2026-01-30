import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

type Impact = "minor" | "moderate" | "serious" | "critical";

type AxeNode = {
  target?: string[];
  failureSummary?: string;
};

type AxeViolation = {
  id: string;
  impact?: Impact;
  help: string;
  helpUrl: string;
  nodes?: AxeNode[];
};

const failOnImpacts: Impact[] = ["critical", "serious"];

const analyzePage = async (page: Page) => {
  // Stabilize the DOM/CSS before analysis:
  // - Scroll-reveal uses opacity transitions that can temporarily lower contrast.
  await page.evaluate(() => {
    document.documentElement.classList.remove("has-scroll-reveal");
    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      el.classList.add("is-revealed");
    }
  });

  const results = await new AxeBuilder({ page })
    // WCAG tags cover a lot of ARIA + contrast checks.
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    // Exclude anything that might be off-screen/hidden by design systems.
    // (Keep minimal; add selectors here only when you intentionally accept a violation.)
    .analyze();

  const violations = (results.violations as unknown as AxeViolation[]).filter(
    (v) => failOnImpacts.includes(v.impact ?? "minor"),
  );

  return violations;
};

const printViolations = (title: string, violations: AxeViolation[]) => {
  if (!violations.length) return;

  // eslint-disable-next-line no-console
  console.log(`\nA11y violations (${title}):`);
  for (const v of violations) {
    // eslint-disable-next-line no-console
    console.log(`- [${v.impact}] ${v.id}: ${v.help}`);
    // eslint-disable-next-line no-console
    console.log(`  ${v.helpUrl}`);
    for (const node of v.nodes ?? []) {
      const target = (node.target ?? []).join(", ");
      // eslint-disable-next-line no-console
      console.log(`  target: ${target}`);
      if (node.failureSummary) {
        // eslint-disable-next-line no-console
        console.log(`  ${node.failureSummary}`);
      }
    }
  }
};

test.describe("Accessibility (Axe)", () => {
  test("/ has no serious/critical violations", async ({ page }) => {
    await page.goto("/");
    const violations = await analyzePage(page);
    printViolations("/", violations);
    expect(violations).toEqual([]);
  });

  test("/es has no serious/critical violations", async ({ page }) => {
    await page.goto("/es/");
    const violations = await analyzePage(page);
    printViolations("/es/", violations);
    expect(violations).toEqual([]);
  });
});
