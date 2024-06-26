/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s infinite',
        fadein: 'fadeIn 0.5s ease-in-out',
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
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
    fontFamily: {
      mono: ['JetBrainsMono-Regular', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
};
