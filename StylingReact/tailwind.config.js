/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f0920e',
        secondary: '#333333',
        accent: '#f0f0f0',
        error: '#ff0000',
      },
      fontFamily: {
        sans: ['"Pacifico"', 'cursive'],
      },
    },
  },
  plugins: [],
}