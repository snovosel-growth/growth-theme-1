/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/sections/**/*.liquid"],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
    },
    {
      autoprefixer: {},
    }
  ]
}

