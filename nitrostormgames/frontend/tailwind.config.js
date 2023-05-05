/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  important: "#app",
  theme: {
    extend: {
      colors: {
        // bookmark landing page
        "bookmark-red": "#DE0A17",
        "bookmark-grey": "#9194a1",
        "bookmark-black": "#000000",
        "bookmark-white": "#f7f7f7",
      },
    },
    fontFamily: {
      // bookmark landing page
      Rubik: ["Rubik", "sans-serif"],
    },
    // bookmark landing page
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },
  prefix: "tw-",
  plugins: [],
};
