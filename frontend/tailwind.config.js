/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: {
        'super-light': 'rgba(32, 31, 30, 0.04)',
        'extra-light': '#605E5C',
        light: '#201F1E',
        DEFAULT: '#000000',
      },
      white: '#ffffff',
      blue: {
        light: 'rgba(64, 126, 201, 0.08)',
        DEFAULT: '#407EC9',
        dark: 'rgba(64, 126, 201, 0.16)',
      },
      gray: {
        'extra-light': '#A19F9D',
        light: 'rgba(32, 31, 30, 0.04)',
        DEFAULT: '#F3F3F3',
      },
      red: '#FF6161',
      violet: '#512689',
    },
    fontFamily: {
      Lato: ['Lato', 'sans-serif'],
    },
    fontSize: {
      'extra-small': ['12px', '9px'],
      xs: ['12px', '16px'],
      sm: ['13px', '20px'],
      base: ['15px', '20px'],
      lg: ['18px', '24px'],
      xl: ['24px', '32px'],
    },
    extend: {},
  },
  plugins: [],
};
