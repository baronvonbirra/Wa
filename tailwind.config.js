/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        japan: {
          red: '#E11D48', // rose-600 or bright Japanese red
          gold: '#D97706', // amber-600
          pastelBg: '#FFFDF9', // nice off-white warm pastel background
        }
      }
    },
  },
  plugins: [],
}
