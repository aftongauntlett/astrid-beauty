// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// Falls back to the production domain so canonical/OG URLs and the sitemap
// never bake in a build-machine URL (e.g. localhost) when the env var isn't set.
const site =
  process.env["PUBLIC_SITE_URL"] ?? process.env["SITE_URL"] ?? "https://byastridbeautysalon.com";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [react(), sitemap()],
});
