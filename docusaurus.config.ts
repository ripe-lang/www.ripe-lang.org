import { themes as prismThemes } from "prism-react-renderer";
import { ripeDark, ripeLight } from "./src/ripe-theme";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Ripe",
  tagline: "A systems programming language",
  favicon: "img/logo.png",

  future: {
    v4: true,
  },

  url: "https://www.ripe-lang.org",
  baseUrl: "/",

  organizationName: "ripe-lang",
  projectName: "www.ripe-lang.org",
  trailingSlash: false,

  onBrokenLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/ripe-lang/www.ripe-lang.org/edit/main/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ["rss", "atom"], xslt: true },
          editUrl: "https://github.com/ripe-lang/www.ripe-lang.org/edit/main/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/combination_dark.png",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Ripe",
      logo: {
        alt: "Ripe",
        src: "img/logo.png",
        srcDark: "img/logo.png",
        href: "/",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "right",
          label: "Docs",
        },
        {
          to: "/docs/reference/types",
          label: "Packages",
          position: "right",
        },
        {
          to: "/docs/getting-started/installation",
          label: "Download",
          position: "right",
        },
        {
          to: "/blog",
          label: "Blog",
          position: "right",
        },
        {
          href: "https://github.com/ripe-lang/ripe",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Learn",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started/installation",
            },
            { label: "Language Tour", to: "/docs/tutorial/variables" },
            { label: "Reference", to: "/docs/reference/types" },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "GitHub", href: "https://github.com/ripe-lang/ripe" },
            {
              label: "Issues",
              href: "https://github.com/ripe-lang/ripe/issues",
            },
            {
              label: "Contributing",
              href: "https://github.com/ripe-lang/ripe/blob/main/CONTRIBUTING.md",
            },
          ],
        },
        {
          title: "More",
          items: [
            { label: "Blog", to: "/blog" },
            { label: "Source", href: "https://github.com/ripe-lang/ripe" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ripe Contributors.`,
    },
    prism: {
      theme: ripeLight,
      darkTheme: ripeDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
