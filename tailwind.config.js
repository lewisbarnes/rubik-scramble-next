/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
    },
    extend: {
      fontFamily: {
        'dseg7': ['dseg7', 'ui-monospace'],
        'fira': ['fira-code', 'ui-monospace']
      }
    }
  },
  plugins: [],
}
