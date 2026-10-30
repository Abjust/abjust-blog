import type { UIStrings } from "./types";
import config from "@/config";

export { tplStr } from "./format";

const modules = import.meta.glob<{ default: UIStrings }>("./lang/*.ts", {
  eager: true,
});

const translations: Record<string, UIStrings> = {};
for (const [path, mod] of Object.entries(modules)) {
  const locale = path.slice("./lang/".length, -".ts".length);
  translations[locale] = mod.default;
}

/** Returns UI strings for the given locale, falling back to English. */
export function useTranslations(locale: string = "en"): UIStrings {
  return translations[locale] ?? translations["en"];
}

/**
 * Returns the site description for the given locale: `config.site.description`
 * for the default locale, the translated tagline otherwise.
 */
export function getSiteDescription(locale: string): string {
  return locale === config.site.lang
    ? config.site.description
    : useTranslations(locale).home.tagline;
}
