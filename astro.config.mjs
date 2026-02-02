// @ts-check
import preact from "@astrojs/preact";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [preact({ compat: true })],
  redirects: {
    "/notes/page/1": {
      // リダイレクト元のパス
      status: 302, // リダイレクトのステータスコード
      destination: "/notes", // リダイレクト先のパス
    },
  },
});
