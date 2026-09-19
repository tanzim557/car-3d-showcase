/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        showroom: {
          dark: '#08090C',
          surface: '#12141A',
          card: 'rgba(22, 26, 35, 0.75)',
          border: 'rgba(255, 255, 255, 0.1)',
          accent: '#3B82F6',
          neon: '#00F0FF',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};
