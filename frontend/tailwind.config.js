// tailwind.config.js
const { heroui } = require("@heroui/theme");
const textShadow = require('tailwindcss-textshadow');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/{accordion,divider}.js", // ✅ use `{}` not `()`
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui(),
    textShadow, // ✅ make sure this is installed
  ],
};
