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
      'landing': "url('../public/assets/images/landing-bg.png')"
    },
    extend: {},
  },
  plugins: [],
}

