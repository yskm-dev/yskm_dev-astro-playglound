// @ts-check
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL || "http://localhost:3000",
  adapter: cloudflare(),
  output: "static",
  integrations: [sitemap()],
  redirects: {
    "/notes/page/1": {
      // リダイレクト元のパス
      status: 302, // リダイレクトのステータスコード
      destination: "/notes", // リダイレクト先のパス
    },
  },
  server: { host: true, open: true },
});
