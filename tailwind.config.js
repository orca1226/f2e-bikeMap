const plugin = require('tailwindcss/plugin')
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
      transparent: 'transparent',
      green: {
        light: '#1EB893',
        DEFAULT: '#10CC9F'
      },
      prime: {
        100: '#DFE4CE',
        200: '#CBD3B0',
        300: '#A4B375',
        400: '#738047',
        500: '#474F2C',
        600: '#292E19'
      },
      second: {
        100: '#F7D4DD',
        200: '#F1B2C1',
        300: '#F27594',
        400: '#E75578 !important',
        500: '#BC3253',
        600: '#8C3046'
      },
      accent: {
        100: '#FAF0E5 !important',
        200: '#F5DFC6',
        300: '#EABD8A',
        400: '#DE994A !important',
        500: '#C67A24',
        600: '#A3651E'
      },
      blue: '#0085FF',
      yellow: '#FFD746',
      orange: '#F09515',
      tomato: '#E86A6A',
      summer: 'linear-gradient(148.33deg, #3EC6C9 28.68%, #FFD746 84.44%)',
      white: '#FFFFFF',
      gray: {
        100: '#EDEDED',
        200: '#EEEEEE',
        300: '#C5C5C5',
        400: '#9A9A9A',
        500: '#767676',
        600: '#464646'
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
        16: '16px',
        18: '18px',
        22: '22px',
        26: '26px',
        32: '32px',
        36: '36px',
        45: '45px'
      },
      borderRadius: {
        '6px': '6px',
        '8px': '8px',
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
        btnFloat: '0px 4px 40px rgba(0, 0, 0, 0.12)',
        list: '4px 4px 20px rgba(118, 118, 118, 0.3)'
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
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme('fontSize.45'),
          letterSpacing: '0.12em'
        },
        h2: {
          fontSize: theme('fontSize.36'),
          letterSpacing: '0.08em'
        },
        h3: {
          fontSize: theme('fontSize.32'),
          letterSpacing: '0.07em'
        },
        h4: {
          fontSize: theme('fontSize.26'),
          letterSpacing: '0.05em'
        },
        h5: {
          fontSize: theme('fontSize.22'),
          letterSpacing: '0.04em'
        },
        input: {
          fontSize: theme('fontSize.12')
        }
      })
    })
  ]
}
