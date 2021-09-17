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
          complement: "#214B9E",
          lighter: "#91B0EE",
          darker: "#3742D4",
          darkerer: "#262E94",
          darkest: "#161A54",
          bluegray: "#728ABA",
          bluemidgray: "#5C6F96",
          bluedarkgray: "#3E4B66",
          blueblack: "#222A38",
          darkerpurple: "#5731EB",
          royalpurple: "#7222D4",
          darkroyal: "#501894",
          berry: "#7A4B78",
          lightmagenta: "#DE45D6",
          magenta: "#AD13A5",
          darkmagenta: "#912D8C",
          grass: "#87B827",
          forest: "#4F6B16",
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
      width: {
        onetwelve: '28rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
