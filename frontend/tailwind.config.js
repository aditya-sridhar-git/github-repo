/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-lime': '#c5d94e',
        'pastel-mint': '#b5dbd0'
      }
    },
  },
  plugins: [],
}

