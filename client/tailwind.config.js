module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        theme: {
          main: "#497FEB",
          smoke: "rgba(0, 0, 0, 0.25)"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
