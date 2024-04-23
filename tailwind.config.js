/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      fontFamily:{
          'roboto': ['Roboto Mono','sans-serif']
      },
      keyframes: {
        wiggle: {
          '0%': {opacity: 0 },
          '100%': {opacity: 100},
        }
      },
      animation: {
        'spin-slow': 'spin 3s',
        wiggle: 'wiggle 1s ease-in-out',
      },
      fontWeight: {
        'bold': ['700']
      },
      colors: {
        custom: {
          primaryColorText:'#ffffff',
          secondaryColorText:'#fff6e0',
          primaryButton: '#2A40BF',
          bgColor: '#272829'

        },
      },
    },
  },
  plugins: [],
}