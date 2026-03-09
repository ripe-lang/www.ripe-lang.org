import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: ["getting-started/installation", "getting-started/hello-world"],
    },
    {
      type: "category",
      label: "Language Tour",
      collapsed: false,
      items: [
        "tutorial/variables",
        "tutorial/control-flow",
        "tutorial/functions",
        "tutorial/structs",
        "tutorial/interfaces",
        "tutorial/generics",
        "tutorial/error-handling",
      ],
    },
    {
      type: "category",
      label: "How-To Guides",
      items: [
        "how-to/compile-and-run",
        "how-to/call-c-libraries",
        "how-to/use-modules",
      ],
    },
    {
      type: "category",
      label: "Explanation",
      items: [
        "explanation/memory-model",
        "explanation/error-design",
        "explanation/type-system",
      ],
    },
    {
      type: "category",
      label: "Reference",
      items: [
        "reference/types",
        "reference/operators",
        "reference/arrays",
        "reference/pointers",
        "reference/generics",
        "reference/modules",
        "reference/error-handling",
        "reference/extern",
      ],
    },
  ],
};

export default sidebars;
