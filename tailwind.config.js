const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      boxShadow: {
        dark: '8px 8px 24px 0 rgba(0, 0, 0, 1)',
      },
      inset: {
        'mobile-vertical': 'calc(100vh - 260px)',
        'mobile-horizontal': 'calc(100vh - 210px)',
      },
      height: {
        'mobile-screen': 'calc(100vh + 60px)',
      },
      keyframes: {
        appear: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        appearing: 'appear 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
