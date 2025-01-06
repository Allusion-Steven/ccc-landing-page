/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        miami: {
          pink: '#ff1b6b',
          blue: '#45caff',
          dark: '#1e1e1e',
          purple: '#2d1b2a',
          'hot-pink': '#ff0080',
          teal: '#00ffff',
          'neon-blue': '#45caff',
          'deep-purple': '#6a0dad'
        }
      },
      backgroundImage: {
        'miami-gradient': 'linear-gradient(to right, #ff1b6b, #45caff)',
        'miami-dark': 'linear-gradient(to bottom, #1e1e1e, #2d1b2a)',
        'miami-glow': 'linear-gradient(to right, #ff0080, #00ffff)',
        'miami-sunset': 'linear-gradient(135deg, #ff0080, #ff1b6b, #6a0dad)',
        'miami-night': 'linear-gradient(to right bottom, #1e1e1e, #6a0dad)',
      }
    }
  },
  plugins: []
}; 