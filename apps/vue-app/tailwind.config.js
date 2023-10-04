// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const tailwindConfig = require("ui/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
export default {
  ...tailwindConfig,
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,styles.ts}",
  ],
  plugins: [],
};
