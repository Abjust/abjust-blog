import { getRelativeLocaleUrl } from "astro:i18n";
import { BLOG_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";
import { splitPostLocale } from "./postLocale";
import config from "@/config";

function splitPostFilePath(filePath: string | undefined) {
  return splitPostLocale(
    filePath
      ?.replace(BLOG_PATH, "")
      .split("/")
      .filter(path => path !== "") ?? []
  );
}

function getPostPathSegments(filePath: string | undefined): string[] {
  return splitPostFilePath(filePath)
    .segments.filter(path => !path.startsWith("_"))
    .slice(0, -1)
    .map(segment => slugifyStr(segment));
}

/**
 * Returns the locale a post is written in, based on its location:
 * `src/content/posts/{locale}/...` for non-default locales, otherwise the
 * default locale.
 */
export function getPostLocale(filePath: string | undefined): string {
  return splitPostFilePath(filePath).locale;
}

function getIdSlug(id: string): string {
  const postId = id.split("/");
  return postId.length > 0 ? String(postId[postId.length - 1]) : id;
}

function getPostSlugPath(id: string, filePath: string | undefined): string {
  const pathSegments = getPostPathSegments(filePath);
  const slug = getIdSlug(id);
  return pathSegments.length > 0
    ? [...pathSegments, slug].join("/")
    : String(slug);
}

/**
 * Returns the slug-only path for use as a route param in `getStaticPaths`.
 * No base prefix, no locale — Astro handles those at a higher level.
 * A post and its translations share the same slug.
 * e.g. `/examples/my-post`
 */
export function getPostSlug(id: string, filePath: string | undefined): string {
  return `/${getPostSlugPath(id, filePath)}`;
}

/**
 * Returns a fully navigable URL for use in `<a href>` and RSS links.
 * Applies both locale routing and the configured Astro base via
 * `getRelativeLocaleUrl`.
 * e.g. `/posts/my-post` or `/en/posts/my-post`
 */
export function getPostUrl(
  id: string,
  filePath: string | undefined,
  locale: string | undefined = config.site.lang
): string {
  return getRelativeLocaleUrl(locale, `posts/${getPostSlugPath(id, filePath)}`);
}
