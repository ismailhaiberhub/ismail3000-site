import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Adresse publique du site. À changer (ou à définir dans Netlify via SITE_URL)
// le jour où le nom de domaine est branché.
const SITE_URL = process.env.SITE_URL || "https://ismailhaiber.netlify.app";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "ignore",
  build: { format: "directory" },
  integrations: [
    sitemap({
      filter: (page) => !/\/(merci|en\/thanks)\/?$/.test(page),
      i18n: { defaultLocale: "fr", locales: { fr: "fr-FR", en: "en-US" } },
    }),
  ],
});
