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
      'event': "url('../public/assets/event.png')",
      'account': "url('../public/assets/dots.png')",
      'landing1': "url('../public/assets/landing-img1.png')",
    },
    extend: {},
  },
  plugins: [],
}

