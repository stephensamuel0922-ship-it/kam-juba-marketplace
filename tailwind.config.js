/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kbkYellow: "#FFD60A",
        kbkBlack: "#111111",
        kbkGreen: "#1E8E3E",
        kbkRed: "#D32F2F",
      },
    },
  },
  plugins: [],
};