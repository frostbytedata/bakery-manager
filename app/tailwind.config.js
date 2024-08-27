/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'bm-dark_type': '#3c3c3c',
        'bm-red': '#b95c02',
        'bm-red_dark': '#b75500',
        'bm-error': '#d9706e',
        'bm-brown': '#b7856d',
        'bm-green': '#81b29a',
        'bm-yellow': '#f2cc8f',
        'bm-offwhite': '#f3f3f3',
        'bm-outline_highlight': '#ffd5a2',
        'bm-background_light': '#f4f1de',
        'bm-background_light_contrast': '#f5eed7cc',
        'bm-background_active': '#e7be886e',
        'bm-background_active_fadednahoe': 'rgba(231,190,136,0.2)',
        'bm-background_alt': 'rgba(199,141,111,0.56)',
        'bm-background': '#2f4b6a',
        'bm-accent': '#5b8aa9',
      },
      fontFamily: {
        sans: ['Montserrat'],
        montserrat: ['Montserrat'],
      },
      height: {
        128: '32rem', // 512px
        160: '40rem', // 640px
        192: '48rem', // 768px
      },
      animation: {
        slowspin: 'spin 5s linear infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.4rem',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        },
      });
    }),
  ],
};
