/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s infinite',
      },
      keyframes: {
        blink: {
          '0%': {
            opacity: '0',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
    },
    fontFamily: {
      mono: ['JetBrainsMono-Regular', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
};
