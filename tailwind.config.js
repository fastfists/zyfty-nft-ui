/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "darkgreen": "#19322F",
        "darkpurple": "#210420",
      },
    },
  },
  plugins: [],
}
