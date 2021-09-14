module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      main: ["Playfair Display", "serif"]
    },
    extend: {
      colors: {
        theme: {
          main: "#497FEB",
          lighter: "#91B0EE",
          darker: "#3742D4",
          bluegray: "#728ABA",
          aliceblue: "#F0F8FF",
          smoke: "rgba(0, 0, 0, 0.25)"
        }
      },
      height: {
        ten: '10%',
        ninety: '90%'
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
