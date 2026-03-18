/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f4f6ff',
          100: '#e9eafa',
          200: '#cacef5',
          300: '#aab1ef',
          400: '#8791e6',
          500: '#6471db',
          600: '#4f56cc',
          700: '#4346b0',
          800: '#393c8e',
          900: '#313572',
          950: '#1d1f42',
        },
        dark: {
          bg: '#050505',
          surface: '#111111',
          surfaceHover: '#1A1A1A',
          border: '#222222',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'glass-card': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow': '0 0 40px -10px rgba(100, 113, 219, 0.5)',
      }
    },
  },
  plugins: [],
};
