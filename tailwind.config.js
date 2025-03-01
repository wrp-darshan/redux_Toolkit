/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'header-gradient': "linear-gradient(90deg, rgba(251,146,60,1) 0%, rgba(253,186,116,1) 50%, rgba(255,237,213,1) 100%)"
      }
    },
  },
  plugins: [],
}
