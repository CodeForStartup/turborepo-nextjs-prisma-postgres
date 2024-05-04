import tailwindConfig from "tailwind-config/tailwind.config.js";

module.exports = {
  semi: false,
  printWidth: 100,
  trailingComma: "es5",
  arrowParens: "always",
  tabWidth: 2,
  useTabs: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  singleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  singleAttributePerLine: true,
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/",
    "",
    "^[.][.]/",
    "^[./]",
  ],
  tailwindConfig: tailwindConfig,
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
}
