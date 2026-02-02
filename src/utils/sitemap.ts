export const SITE_NAME = import.meta.env.SITE_NAME;
export const SITE_URL = import.meta.env.SITE_URL;
export const SITE_MAP = {
  slug: "",
  title: "yskm_dev",
  description: "yskm_devのサイトです。",
  isHome: true,
  children: [
    {
      slug: "about",
      title: "About",
      description: "このサイトについて",
      children: [],
    },
    {
      slug: "notes",
      title: "Notes",
      description: "技術メモ・備忘録",
      children: [
        {
          slug: "page",
          title: "Notes Page",
          description: "",
          children: [],
        },
      ],
    },
    {
      slug: "rules",
      title: "Rules",
      description: "サイトのデザインルールをまとめたもの",
      children: [],
    },
    {
      slug: "sketch",
      title: "Sketch",
      description: "コードのスケッチやドローイングを掲載するページ（準備中）",
      children: [],
    },
    {
      slug: "preview",
      title: "Preview",
      description: "",
      isNoIndex: true,
      children: [
        {
          slug: "notes",
          title: "Notes Preview",
          description: "",
          isNoIndex: true,
          children: [],
        },
      ],
    },
  ],
};

type PageInfo = {
  slug: string;
  title: string;
  description?: string;
  isHome?: boolean;
  isNoIndex?: boolean;
  children: PageInfo[];
};

export const getPageInfoArray = (
  path: string,
  dynamicPageInfo?: PageInfo,
): PageInfo[] => {
  const paths = path.split("/");
  if (paths[paths.length - 1] === "") {
    paths.pop();
  }

  if (dynamicPageInfo) {
    paths.pop();
  }

  let breadcrumb: PageInfo[] = [];

  paths.forEach((path, index) => {
    let target: PageInfo = {
      slug: "",
      title: "",
      children: [],
    };
    const _target =
      index === 0
        ? SITE_MAP
        : breadcrumb[index - 1].children.find((child) => child.slug === path);
    if (_target) {
      target = _target;
    }
    breadcrumb.push(target);
  });

  if (dynamicPageInfo) {
    breadcrumb.push(dynamicPageInfo);
  }

  if (breadcrumb.length > 1 && breadcrumb[breadcrumb.length - 1].title === "") {
    const index = 0;
    const notFound = {
      slug: "404",
      title: "ページが見つかりません",
      children: [],
    };
    breadcrumb = [breadcrumb[index], notFound];
  }

  return JSON.parse(JSON.stringify(breadcrumb));
};

export const getPageInfo = (path: string) => {
  const pageInfoArray = getPageInfoArray(path);
  return pageInfoArray[pageInfoArray.length - 1];
};
