// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://shapes-soft.github.io",
  base: "/shapespage",
  trailingSlash: "always",
  integrations: [sitemap()],
});