module.exports = {
  root: true,
  extends: ["custom"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  ignorePatterns: ["@/components/*", "src/components/*"]
};
