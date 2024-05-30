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
      green: '#3dd68c',
      brand: '#00e182',
      background: '#0e0e0e',
      border: '#2F3135',
      icon: '#696e77',
      gray: '#18191B',
      text: '#ABB7C2',
      tag: '#27292C',

      green: {
        bg: '#00ff9f',
        DEFAULT: '#00cd75',
        light: '#3dd68c',
      },

      dark: {
        bg: '#0e0e0e',
        border: '#2F3135',
        overlay: '#18191B',
        text: '#ABB7C2',
        tag: '#27292C',
      },
      light: {
        bg: '#f9f9f9',
        border: '#E0E1E7',
        overlay: '#FFFFFF',
        text: '#60646c',
        tag: '#F0F0F3',
      },
    },

    fontFamily: {
      GeistMono: [
        'GeistMono',
        'ui-monospace',
        'SFMono-Regular',
        'Roboto Mono',
        'Menlo',
        'Monaco',
        'Liberation Mono',
        'DejaVu Sans Mono',
        'Courier New',
        'monospace',
      ],
      GeistSans: ['GeistSans', 'GeistSans_Fallback'],
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
