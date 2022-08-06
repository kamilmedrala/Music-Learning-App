module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      colors: {
        green: {
          1000: "#EDF6F9",
          2000: "#83C5BE",
          3000: "#006D77",
        },
        brown: {
          1000: "#FFDDD2",
          2000: "#E29578",
        },
      },
    },
    fontFamily: {
      main: ["'Josefin Slab'", "ui-serif", "Times New Roman", "serif"],
      body: ["'Josefin Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
