/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			'2xl': { max: '1535px' },
			xl: { max: '1279px' },
			lg: { max: '1023' },
			md: { max: '767' },
			sm: { max: '639' },
		},
		extend: {},
	},
	plugins: [],
}
