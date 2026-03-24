/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cellar: {
          950: '#0a0608',
          900: '#120c10',
          800: '#1e1118',
          700: '#2d1825',
          600: '#3d2133',
        },
        burgundy: {
          900: '#4a0e1f',
          800: '#6b1530',
          700: '#8b1a3e',
          600: '#a82150',
          500: '#c42e62',
          400: '#d94f7a',
        },
        gold: {
          500: '#c9a84c',
          400: '#d4b96a',
          300: '#e0cc92',
          200: '#eeddba',
        },
        stone: {
          850: '#1c1917',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'cellar-gradient': 'linear-gradient(135deg, #0a0608 0%, #1e1118 50%, #120c10 100%)',
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #e0cc92 50%, #c9a84c 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #4a0e1f 0%, #8b1a3e 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'shimmer': 'shimmer 1.8s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
