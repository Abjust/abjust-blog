import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeCallouts from "rehype-callouts";
import rehypeFigure from "@microflash/rehype-figure";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import config from "./astro-paper.config";

// A post gets a table of contents under a "## 目录" / "## Table of contents" heading
const tocHeading = "目录|table[ -]of[ -]contents?";

export default defineConfig({
  site: config.site.url,
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        config.features?.showArchives !== false || !page.endsWith("/archives/"),
    }),
  ],
  i18n: {
    locales: config.site.locales ?? [config.site.lang ?? "en"],
    defaultLocale: config.site.lang ?? "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkMath,
        [remarkToc, { heading: tocHeading }],
        [
          remarkCollapse,
          {
            test: new RegExp(`^(${tocHeading})$`, "i"),
            summary: (heading: string) => heading,
          },
        ],
      ],
      rehypePlugins: [rehypeKatex, rehypeCallouts, rehypeFigure],
    }),
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Manrope",
      cssVariable: "--font-latin",
      // No generic fallback here: it would match Chinese characters before
      // MiSans gets a chance (see `--font-app` in src/styles/theme.css).
      fallbacks: [],
      options: {
        variants: [{
          src: ['./src/assets/fonts/Manrope-Regular.woff2'],
          weight: '400',
          style: 'normal'
        },
        {
          src: ['./src/assets/fonts/Manrope-Bold.woff2'],
          weight: '700',
          style: 'normal'
        }
      ]
      }
    },
    {
      provider: fontProviders.local(),
      name: "MiSans",
      cssVariable: "--font-cjk",
      options: {
        variants: [{
          src: ['./src/assets/fonts/MiSans-Regular.woff2'],
          weight: '400',
          style: 'normal'
        },
        {
          src: ['./src/assets/fonts/MiSans-Bold.woff2'],
          weight: '700',
          style: 'normal'
        }
      ]
      }
    },
  {
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
      formats: ["woff", "ttf"],
    },
  ],
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
