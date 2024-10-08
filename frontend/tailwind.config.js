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
      'landing': "url('./assets/background1.png')"
    },
    extend: {},
  },
  plugins: [],
}

