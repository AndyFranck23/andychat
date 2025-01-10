/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "animMenu": "menu 0.5s ease 1",
      },
      keyframes: {
        menu: {
          "0%": { transform: 'translateY(-100%)', opacity: "0" },
          "100%": { transform: 'translateY(0%)', opacity: "1" },
        },
      },
      colors: {
        'footer': 'rgb(43, 33, 31)',
        'myRed': '',
      },
      screens: {
        'xs': '400px'
      }
    },
  },
  plugins: [],
}

