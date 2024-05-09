module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "next",
    "turbo",
    "prettier",
    "next/core-web-vitals",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ["unused-imports", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ],
    "no-console": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
}
