// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://traceit.es",
  compressHTML: true,
  // CSS incrustado en cada página: evita una petición que bloquea el renderizado
  build: { inlineStylesheets: "always" },
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
});
