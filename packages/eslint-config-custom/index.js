module.exports = {
  extends: ["next", "turbo", "prettier", "plugin:react-hooks/recommended", "plugin:jsx-a11y/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
