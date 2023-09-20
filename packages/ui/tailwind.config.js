import { TailwindCSSColors } from "./src/constants";

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: { ...TailwindCSSColors },
    },
  },

  plugins: [],
};
