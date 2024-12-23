/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    letterSpacing: {
      normal: '0',
    },
    fontFamily: {
    },
    backgroundImage: {
      'landing': "url('../public/assets/images/landing-bg.png')",
      'gradient': "url('../public/assets/gradient.png')",
      'search': "url('../public/assets/petsearchbg.png')",
      'event': "url('../public/assets/events_background.png')",
      'account': "url('../public/assets/dots.png')",
      'landing1': "url('../public/assets/landing-img1.png')",
    },
    extend: {
      colors:{
        'baby-purple': '#d8c7ff',
        'turquoise': '#C9FFE5',
        'blue-gray': '#72A0C1',
      },
    },
  },
  plugins: [],
}

