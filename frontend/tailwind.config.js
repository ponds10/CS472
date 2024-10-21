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
      'landing': "url('../public/assets/background1.png')",
      'gradient': "url('../public/assets/gradient.png')",
      'search': "url('../public/assets/search.png')",
      'event': "url('../public/assets/event.png')",
    },
    extend: {},
  },
  plugins: [],
}

