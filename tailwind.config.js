/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#ff5e14",
        secondary:"white",
        light:"#f0f8ffc4"
      }
    },
  },
  plugins: [],
}