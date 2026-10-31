import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

// reading-time counts each CJK character as one word at 200 words per minute,
// which overestimates Chinese posts. Count CJK characters separately instead.
const CJK_CHARS = /[぀-ヿ㐀-䶿一-鿿豈-﫿]/g;
const CJK_CHARS_PER_MINUTE = 400;

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const cjkCount = textOnPage.match(CJK_CHARS)?.length ?? 0;
    const otherMinutes = getReadingTime(
      textOnPage.replace(CJK_CHARS, " ")
    ).minutes;
    // Store whole minutes rather than `readingTime.text` ("3 min read"), which
    // is English-only; pages format it per locale via `t.post.readingTime`.
    data.astro.frontmatter.minutesRead = Math.max(
      1,
      Math.round(cjkCount / CJK_CHARS_PER_MINUTE + otherMinutes)
    );
  };
}
