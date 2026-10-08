/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        japan: {
          red: '#E11D48',
          gold: '#D97706',
          pastelBg: '#FFFDF9',
        },
        kawaii: {
          sakura: '#FFB7B2',
          peach: '#FFDAC1',
          matcha: '#E2F0CB',
          mint: '#B5EAD7',
          lavender: '#C7CEEA',
        }
      }
    },
  },
  plugins: [],
}
