// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import sitemap, {
  ChangeFreqEnum as EnumChangeFrequency,
} from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => page.startsWith("https://badakgunung.pages.dev"),
      serialize(item) {
        // Check if this is the homepage
        const isHomepage =
          item.url === "https://badakgunung.pages.dev/" ||
          item.url === "https://badakgunung.pages.dev";

        // Set higher priority for homepage
        if (isHomepage) {
          return {
            ...item,
            priority: 1.0,
            changefreq: EnumChangeFrequency.MONTHLY, // Homepage updates more frequently
          };
        }

        return item;
      },
    }),
  ],
  output: "static",
});
