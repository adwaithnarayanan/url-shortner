/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#243642",
        primary: "#243642",
        secondary: "#387478",
        three: "#629584",
        four: "#E2F1E7",
        bodyBg: "#e4ede7",
        tableBg: "#c1d6c8",
      },
    },
  },
  plugins: [],
};
