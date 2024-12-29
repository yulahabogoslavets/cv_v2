/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      "white": "var(--white)",
      "black": "var(--black)",
      "orange": {
        "200": "var(--orange-200)",
        "600": "var(--orange-600)",
      },
      "blue": {
        "200": "var(--blue-200)",
        "400": "var(--blue-400)",
        "600": "var(--blue-600)",
        "800": "var(--blue-800)",
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus']),
      addVariant("group-hocus", [".group:hover &", ".group:focus &"]);
    })
  ]
}

