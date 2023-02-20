/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  important: true,
  purge: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "darkgreen": "#19322F",
        "darkpurple": "#210420",
        "lighterpurple": "#795C78",
        "lightestpurple": "#A689A5",
      },
    },
  },
  plugins: [],
}
