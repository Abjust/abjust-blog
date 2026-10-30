import rss from "@astrojs/rss";
import { getSortedPosts } from "./getSortedPosts";
import { getPostUrl } from "./getPostPaths";
import { getPostsByLocale } from "./getStaticPaths";
import { getSiteDescription } from "@/i18n";
import config from "@/config";

/** Builds the RSS feed of posts written in the given locale. */
export async function getRss(locale: string) {
  const posts = await getPostsByLocale(locale);
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: config.site.title,
    description: getSiteDescription(locale),
    site: config.site.url,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPostUrl(id, filePath, locale),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
