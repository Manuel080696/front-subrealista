/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fbf2d5",
        secondary: "#068da9",
        tertiary: "#fdc57b",
        quaternary: {
          inicio: "#074A59",
          fin: "#001A27",
        },
      },
      fontFamily: {
        body: ["IBM Plex Sans", "sans-serif"],
        title: ["IBM Plex Sans Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
};
