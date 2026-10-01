import type { UIStrings } from "../types";

export default {
  nav: {
    home: "主页",
    posts: "文章",
    tags: "标签",
    about: "关于",
    archives: "归档",
    search: "Search",
  },
  post: {
    publishedAt: "发布于",
    updatedAt: "更新于",
    sharePostIntro: "分享这篇文章：",
    sharePostOn: "在 {{platform}} 分享这篇文章",
    sharePostViaEmail: "通过邮箱分享这篇文章",
    tagLabel: "标签",
    backToTop: "返回顶部",
    goBack: "返回",
    editPage: "编辑页面",
    previousPost: "上一篇文章",
    nextPost: "下一篇文章",
  },
  pagination: {
    prev: "Prev",
    next: "Next",
    page: "Page",
  },
  home: {
    socialLinks: "社交账号",
    featured: "精选",
    recentPosts: "近期文章",
    allPosts: "所有文章",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "All rights reserved.",
  },
  pages: {
    tagTitle: "标签",
    tagDesc: "所有带此标签的文章",

    tagsTitle: "标签列表",
    tagsDesc: "所有在文章中使用的标签",

    postsTitle: "文章",
    postsDesc: "我发布的所有文章",

    archivesTitle: "归档",
    archivesDesc: "我归档的所有文章",

    searchTitle: "搜索",
    searchDesc: "搜索文章……",
  },
  a11y: {
    skipToContent: "跳到正文",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    toggleTheme: "切换主题",
    searchPlaceholder: "搜索文章……",
    noResults: "找不到结果",
    goToPreviousPage: "上一页",
    goToNextPage: "下一页",
  },
  notFound: {
    title: "404 Not Found",
    message: "Page Not Found",
    goHome: "Go back home",
  },
} satisfies UIStrings;
