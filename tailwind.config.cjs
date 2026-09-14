/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'DM Sans', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        ink: '#080d16',
        panel: '#0d1521',
        line: '#1d2a3b',
        muted: '#7d8ca3',
        lime: '#c7f36b',
        aqua: '#64d9c0',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(199, 243, 107, .12), 0 18px 50px rgba(0,0,0,.24)',
      },
    },
  },
  plugins: [],
}
