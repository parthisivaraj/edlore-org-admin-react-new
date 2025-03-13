/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',

  theme: {
    extend: {
      animation: {
        'slide': 'slide 0.35s linear 1',
      },
      keyframes: {
        slide: {
          '0%': { opacity:'0', transform: 'translateY(-50%)' },
          '100%': {opacity:'1', transform: 'translateY(0)' },
        }
      },
    },

    fontFamily: {
      fontFamily: 'Roboto',
    },

    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '0.95rem',
      'lg': '1.125rem',
      'xl': '1.2rem',
      '2xl': '1.35rem',
      '3xl': '1.575rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#FFFFFF',
      'black': '#00000',
      'black1': '#121212',
      'black2': '#182940',
      'black3': '#1F1B24',
      'black4': '#050D17',
      'black5':'#003696',
      'primary': '#3475DD',
      'secondary': '#7DC668',
      'secondary2' : '#F2F9F0',
      'yellow': '#F4BE05',
      'navyblue1': '#1C2260',
      'blue2': '#7594BF',

      'darkMainBg': '#262626',
      'darkBg' : '#161616',

      'gray': '#FAFBFE',
      'gray2': '#D8DFED',
      'gray3': '#7C7E80',
      'gray4': '#F2F3F5',
      'gray5': '#F5F5F0',
      'gray6' : '#B2B2B2',

      'danger': '#F41919',
      'danger-dark': '#C21616', // darker red for hover or border
      'danger-light': '#F97F7F', // lighter red for hover in dark mode

    },
  },

  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
  ],

  variants: {
    // scrollbar: ['rounded', 'dark'],
  },
}
