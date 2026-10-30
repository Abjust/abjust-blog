import config from "@/config";

/**
 * Splits a post path (relative to the posts directory) into its locale and the
 * remaining path segments.
 *
 * - Posts under `src/content/posts/{locale}/` belong to that non-default locale
 * - Everything else belongs to the default locale (`config.site.lang`)
 * e.g. `["en", "foo", "bar.md"]` → `{ locale: "en", segments: ["foo", "bar.md"] }`
 */
export function splitPostLocale(segments: string[]): {
  locale: string;
  segments: string[];
} {
  const [first, ...rest] = segments;
  if (first !== config.site.lang && config.site.locales.includes(first)) {
    return { locale: first, segments: rest };
  }
  return { locale: config.site.lang, segments };
}
