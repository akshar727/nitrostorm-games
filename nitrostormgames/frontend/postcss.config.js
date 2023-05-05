const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [
    'postcss-preset-env',
    "@csstools/postcss-is-pseudo-class",
    tailwindcss,
  ],
};

