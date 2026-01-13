/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Clean modern typography
        sans: [
          'Inter',
          'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI',
          'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol'
        ],
      },
      keyframes: {
        typing: {
          '0%, 20%': { width: '0%' },
          '40%, 60%': { width: '100%' },
          '80%, 100%': { width: '0%' },
        },
        blink: {
          '0%, 100%': { 'border-color': 'transparent' },
          '50%': { 'border-color': 'rgb(0, 212, 255)' },
        },
      },
      animation: {
        typing: 'typing 4s steps(40, end) infinite, blink 0.75s step-end infinite',
      },
      colors: {
        // Brand accents
        brand: {
          400: '#38bdf8',
          500: '#0ea5e9', // electric blue
          600: '#0284c7',
        },
        neon: {
          400: '#00d4ff', // cyan neon
          500: '#06b6d4',
        },
        // Deep-navy slate tweaks for dark UI
        slate: {
          700: '#1c2128',
          800: '#161b22',
          900: '#0a0e1a',
        },
      },
      boxShadow: {
        'ambient': '0 8px 32px rgba(0,0,0,0.40)',
        'ambient-lg': '0 16px 48px rgba(0,0,0,0.50)',
        'glow-sm': '0 0 10px rgba(14,165,233,0.35)',
        'glow': '0 0 20px rgba(14,165,233,0.45), 0 0 40px rgba(14,165,233,0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'premium': 'linear-gradient(135deg, #0a0e1a 0%, #0d1117 50%, #0a0e1a 100%)',
        'blue-glow': 'linear-gradient(135deg, rgba(14,165,233,0.10) 0%, rgba(6,182,212,0.05) 100%)',
      },
      transitionDuration: {
        200: '200ms',
        250: '250ms',
        300: '300ms',
      },
    },
  },
  plugins: [],
});

// Content paths are configured for Vite + React