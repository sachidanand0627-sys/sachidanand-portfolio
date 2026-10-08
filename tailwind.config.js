/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
      colors: {
        sky: "#62C1E5",
        textMain: "#0A2F3D",
        headingMain: "#102F38",
        support: "#587078",
        cardDesc: "#687D84",
        offWhite: "#F7F8F6",
        softGray: "#EEF3F2",
      },
    },
  },
  plugins: [],
}