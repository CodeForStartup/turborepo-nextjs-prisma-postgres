module.exports = {
  root: true,
  extends: ["custom"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
};
