// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

const site = process.env["PUBLIC_SITE_URL"] ?? process.env["SITE_URL"];

// https://astro.build/config
export default defineConfig({
  ...(site ? { site } : {}),
  integrations: [react()],
});
