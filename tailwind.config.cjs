/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily:{
      sans:['Inter', 'sans-serif']
    },
    extend: {
      colors:{
        
      },
      backgroundImage:{
        galaxy:"url('/background-galaxy.png')",
        "nlw-gradient":'linear-gradient(90deg, rgba(33,55,191,1) 5%, rgba(18,164,207,1) 19%, rgba(94,52,210,1) 38%, rgba(170,6,198,1) 58%, rgba(232,111,237,1) 74%, rgba(255,42,161,1) 92%)',
        "game-gradient":'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      }
    },
  },
  plugins: [],
}
