module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["Playfair Display", "serif"],
      main: ["Libre Franklin", "sans-serif"]
    },
    extend: {
      colors: {
        theme: {
          main: "#497FEB",
          lighter: "#91B0EE",
          darker: "#3742D4",
          darkerer: "#262E94",
          darkest: "#161A54",
          bluegray: "#728ABA",
          darkerpurple: "#5731EB",
          royalpurple: "#7222D4",
          darkroyal: "#501894",
          berry: "#7A4B78",
          lightmagenta: "#C73EC0",
          magenta: "#AD13A5",
          darkmagenta: "#912D8C",
          grass: "#76C752",
          forest: "#5A7A4B",
          aliceblue: "#F0F8FF",
          smoke: "rgba(0, 0, 0, 0.33)"
        }
      },
      height: {
        ten: '10%',
        sixty: '60%',
        ninety: '90%',
        eightyvh: '80vh'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
