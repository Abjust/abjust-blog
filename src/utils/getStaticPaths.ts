import type { PaginateFunction } from "astro";
import { getCollection } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getPostLocale, getPostSlug } from "./getPostPaths";
import { getSortedPosts } from "./getSortedPosts";
import { getUniqueTags } from "./getUniqueTags";
import { postFilter } from "./postFilter";
import { slugifyAll } from "./slugify";
import config from "@/config";

/*
 * `getStaticPaths()` implementations shared by the default-locale pages and
 * their `src/pages/{locale}/` counterparts, which only differ by locale.
 */

/** Returns all posts (including drafts) written in the given locale. */
export function getPostsByLocale(locale: string) {
  return getCollection(
    "posts",
    ({ filePath }) => getPostLocale(filePath) === locale
  );
}

/** Paths for `posts/[...page]`. */
export async function getPostListPaths(
  paginate: PaginateFunction,
  locale: string
) {
  const posts = await getPostsByLocale(locale);
  return paginate(getSortedPosts(posts), { pageSize: config.posts.perPage });
}

/** Paths for `tags/[tag]/[...page]`. */
export async function getTagPaths(paginate: PaginateFunction, locale: string) {
  const posts = await getPostsByLocale(locale);
  const tags = getUniqueTags(posts);

  return tags.flatMap(({ tag, tagName }) => {
    const tagPosts = getSortedPosts(
      posts.filter(({ data }) => slugifyAll(data.tags).includes(tag))
    );

    return paginate(tagPosts, {
      params: { tag },
      props: { tagName },
      pageSize: config.posts.perPage,
    });
  });
}

/** Paths for `posts/[...slug]`. */
export async function getPostPaths(locale: string) {
  const allPosts = await getCollection("posts");
  const sortedPosts = getSortedPosts(
    allPosts.filter(({ filePath }) => getPostLocale(filePath) === locale)
  );

  return sortedPosts.map((post, index) => {
    const slug = getPostSlug(post.id, post.filePath);

    // Translations of a post share its slug.
    const translations: Record<string, string> = {};
    for (const other of allPosts.filter(postFilter)) {
      const otherLocale = getPostLocale(other.filePath);
      if (
        otherLocale !== locale &&
        getPostSlug(other.id, other.filePath) === slug
      ) {
        translations[otherLocale] = getRelativeLocaleUrl(
          otherLocale,
          `posts${slug}`
        );
      }
    }

    return {
      params: { slug },
      props: {
        post,
        translations,
        // sortedPosts is newest-first, so "older" (prev) is a higher index
        // and "newer" (next) is a lower index.
        prevPost:
          index < sortedPosts.length - 1
            ? {
                id: sortedPosts[index + 1].id,
                title: sortedPosts[index + 1].data.title,
                filePath: sortedPosts[index + 1].filePath,
              }
            : null,
        nextPost:
          index > 0
            ? {
                id: sortedPosts[index - 1].id,
                title: sortedPosts[index - 1].data.title,
                filePath: sortedPosts[index - 1].filePath,
              }
            : null,
      },
    };
  });
}

/** Paths for `posts/[...slug]/index.png`. */
export async function getPostOgImagePaths(locale: string) {
  if (!config.features.dynamicOgImage) {
    return [];
  }

  const posts = (await getPostsByLocale(locale)).filter(
    ({ data }) => (import.meta.env.DEV || !data.draft) && !data.ogImage
  );

  return posts.map(post => ({
    params: { slug: getPostSlug(post.id, post.filePath) },
    props: post,
  }));
}
