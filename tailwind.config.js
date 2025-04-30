/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		extend: {
			spacing: {
				"dropdown-trigger": "var(--radix-dropdown-menu-content-width, 300px)",
			},
		},
	},
	plugins: [],
};
