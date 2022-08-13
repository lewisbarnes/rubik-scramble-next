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
		animation: {
			type: 'type 1.8s ease-in .8s 1 normal both'
		},
		keyframes: {
			type: {
			  '0%': { width: '0ch' },
			  '7%': { width: '1ch' },
			  '14%': { width: '2ch' },
			  '21%': { width: '3ch' },
			  '28%': { width: '4ch' },
			  '35%': { width: '5ch' },
			  '42%': { width: '6ch' },
			  '49%': { width: '7ch' },
			  '56%': { width: '8ch' },
			  '63%': { width: '9ch' },
			  '70%': { width: '10ch' },
			  '77%': { width: '11ch' },
			  '84%': { width: '12ch' },
			  '91%': { width: '13ch' },
			  '98%': { width: '14ch' },
			}
		},
	fontFamily: {
		'dseg7': ['dseg7', 'ui-monospace'],
        'fira': ['fira-code', 'ui-monospace']
      }
    }
  },
  plugins: [],
}
