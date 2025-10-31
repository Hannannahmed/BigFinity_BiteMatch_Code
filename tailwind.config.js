/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#e0f2fe',
        'primary-medium': '#0ea5e9',
        'primary-dark': '#0c4a6e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'spin-gentle': 'spin 6s ease-in-out infinite',
        'pulse-gentle': 'pulse 4s ease-in-out infinite',
        'spin-gentle': 'spin 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}