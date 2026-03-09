import type { PrismTheme } from "prism-react-renderer";

export const ripeDark: PrismTheme = {
  plain: {
    backgroundColor: "#242424",
    color: "#e7e0d5",
  },
  styles: [
    { types: ["comment"], style: { color: "#6b6358", fontStyle: "italic" } },
    { types: ["string", "char-literal"], style: { color: "#7fb87f" } },
    { types: ["keyword"], style: { color: "#f0a020" } },
    { types: ["builtin", "class-name"], style: { color: "#f0907a" } },
    { types: ["function"], style: { color: "#7ab8d4" } },
    { types: ["number"], style: { color: "#d4a96a" } },
    { types: ["operator"], style: { color: "#c0b8a8" } },
    { types: ["punctuation"], style: { color: "#9a9088" } },
    { types: ["interpolation"], style: { color: "#f0a020" } },
  ],
};

export const ripeLight: PrismTheme = {
  plain: {
    backgroundColor: "#f6f6f6",
    color: "#2c2825",
  },
  styles: [
    { types: ["comment"], style: { color: "#9a9088", fontStyle: "italic" } },
    { types: ["string", "char-literal"], style: { color: "#4a8c4a" } },
    { types: ["keyword"], style: { color: "#b8720a" } },
    { types: ["builtin", "class-name"], style: { color: "#c94040" } },
    { types: ["function"], style: { color: "#2878a8" } },
    { types: ["number"], style: { color: "#a07830" } },
    { types: ["operator"], style: { color: "#5a5248" } },
    { types: ["punctuation"], style: { color: "#7a7068" } },
    { types: ["interpolation"], style: { color: "#b8720a" } },
  ],
};
