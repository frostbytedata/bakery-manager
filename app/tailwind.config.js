/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'bm-red': '#b95c02',
        'bm-brown': '#b7856d',
        'bm-green': '#81b29a',
        'bm-yellow': '#f2cc8f',
        'bm-background-light': '#f4f1de',
        'bm-background': '#2f4b6a',
        'bm-accent': '#829bc2',
      },
      fontFamily: {
        sans: ['Fuzzy Bubbles'],
        quicksand: ['Quicksand'],
        audiowide: ['Audiowide'],
        do: ['Arial'],
        fuzzy_bubbles: ['Fuzzy Bubbles'],
      },
      height: {
        128: '32rem', // 512px
        160: '40rem', // 640px
        192: '48rem', // 768px
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
