/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#F5E6E0',
        ivory: '#FAF7F2',
        gold: '#C9A96E',
        marigold: '#E8A020',
        rose: '#8B3A52',
        'gold-dark': '#A0784A',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        lato: ['Lato', 'sans-serif'],
        hind: ['Hind', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
