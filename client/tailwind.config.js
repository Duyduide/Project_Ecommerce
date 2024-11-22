/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    fontFamily: {
        main: ['Nunito Sans', 'sans-serif;']
    },
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#d70018',
        overlay: 'rgba(0,0,0,0.8)'
      },
      colors: {
        main: '#d70018'
      },
      
    },
  },
  plugins: [],
}