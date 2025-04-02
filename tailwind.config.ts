import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import flowbite from 'flowbite/plugin';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					light: '#f890e7',  // light pink
					dark: '#1C1C1C',   // dark background
					accent: '#513954',  // purple
					blue: '#8393AA', // blue
					muted: '#9f7c9d'    // mauve
				},
				miami: {
					pink: '#ff1b6b',
					blue: '#45caff',
					'bright-blue': '#08D3D3',

					dark: '#1e1e1e',
					purple: '#2d1b2a',
					'hot-pink': '#ff0080',
					teal: '#00ffff',
					'neon-blue': '#45caff',
					'deep-purple': '#6a0dad',
					'light-pink': '#f890e7'
				}
			},
			backgroundImage: {
				'miami-gradient': 'linear-gradient(to right, #ff1b6b, #45caff)',
				'miami-dark': 'linear-gradient(to bottom, #1e1e1e, #2d1b2a)',
				'miami-glow': 'linear-gradient(to right, #ff0080, #00ffff)',
				'miami-sunset': 'linear-gradient(135deg, #ff0080, #ff1b6b, #6a0dad)',
				'miami-night': 'linear-gradient(to right bottom, #1e1e1e, #6a0dad)',
				'miami-pink-night': 'linear-gradient(to right bottom, #1e1e1e, ##f890e7)',
				'light-gradient': 'linear-gradient(to bottom, #ffffff, rgba(200, 177, 199, 0.2))',
				'dark-gradient': 'linear-gradient(to bottom, #1C1C1C, #2d1b2a)'
			}
		}
	},
	plugins: [forms, typography, flowbite]
} satisfies Config;
