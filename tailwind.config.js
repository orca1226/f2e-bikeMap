module.exports = {
  mode: 'jit',
  // These paths are just examples, customize them to match your project structure
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],

  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      green: {
        light: '#1EB893',
        DEFAULT: '#10CC9F'
      },
      blue: '#0085FF',
      yellow: '#FFD746',
      orange: '#F09515',
      tomato: '#E86A6A',
      summer: 'linear-gradient(148.33deg, #3EC6C9 28.68%, #FFD746 84.44%)',
      white: '#FFFFFF',
      gray: {
        50: '#F6F6F6',
        100: '#EDEDED',
        200: '#A8A8A8',
        300: '#E7E7E7',
        400: '#545454',
        500: '#9A9A9A'
      },
      black: {
        light: '#0E0E0E',
        dark: '#333333'
      }
    },
    fontFamily: {
      sans: ['Noto-Sans-TC', 'sans-serif']
    },
    'bg-green': 'linear-gradient(155.4deg, #78E389 0.2%, #1EB893 90.81%)',
    extend: {
      fontSize: {
        12: '12px',
        14: '14px',
        15: '15px',
        16: '16px'
      },
      borderRadius: {
        '10px': '10px',
        '15px': '15px',
        '4xl': '136px'
      },
      zIndex: {
        1: '1',
        '-1': '-1'
      },
      screens: {
        ml: '850px'
      },
      boxShadow: {
        btn: '0px 4px 40px rgba(0, 0, 0, 0.05)',
        btnFloat: '0px 4px 40px rgba(0, 0, 0, 0.12)'
      },
      transitionDuration: {
        DEFAULT: '.3s'
      }
    }
  },
  variants: {
    extend: {
      display: ['responsive', 'hover'],
      flexWrap: ['responsive', 'hover']
    }
  },
  plugins: []
}
