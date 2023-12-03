import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      display: ['Source Serif Pro', 'Georgia', 'serif'],
      body: ['Synonym', 'system-ui', 'sans-serif'],
      'Inter' : ['Noto Sans', 'sans-serif'],
      'Garamond' : ['Cormorant Garamond', 'serif'],
    },
    colors: {
      primary: '#7eaf34',
      col1 : '#17255a',
      col2: '#d88373',
      col3 : '#bd1e1e',
      col4 : '#f5e2c8',
      ...colors
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      transitionProperty: {
        'width': 'width'
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }  
    },
  },
  plugins: [],
}

export default config
