/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{vue,js,ts}', './pages/**/*.vue'],
  theme: {
    screens: {
      mobile: { max: '767px' },
      tablet: { max: '1023px' },
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1326px',
      hd: '1920px',
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000',
      green: '#00cd75',
      brand: '#00e182',
      background: '#0e0e0e',
    },

    fontFamily: {
      inter: ['Inter', 'ui-sans-serif', 'system-ui'],
      grotesk: ['Px Grotesk', 'sans-serif'],
      'grotesk-mono': ['Px Grotesk Mono', 'monospace'],
    },

    extend: {
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
