import type { GetStaticPaths } from "astro";
import { getPostOgImagePaths } from "@/utils/getStaticPaths";

export { GET } from "@/pages/posts/[...slug]/index.png";

export const getStaticPaths = (() =>
  getPostOgImagePaths("en")) satisfies GetStaticPaths;
