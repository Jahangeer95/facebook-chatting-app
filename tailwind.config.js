/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors:{
        mblue :"#3B82F6"

      }
    },
  },
  plugins: [],
}
