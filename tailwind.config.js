/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mv: '320px',
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xll:'1600px' ,
       },
    extend: {
      
    },
  },
  plugins: [],
}

