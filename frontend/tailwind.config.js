/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: '#1e2844',   // ✅ ADD THIS

        primary: {
          50: '#e6f1ff',
          100: '#b3d9ff',
          200: '#80c1ff',
          300: '#4da9ff',
          400: '#1a91ff',
          500: '#0070f3',
          600: '#0059c2',
          700: '#004291',
          800: '#002b60',
          900: '#001430',
        },

        accent: {
          cyan: '#00f5ff',
          coral: '#ff6b6b',
          purple: '#b794f4',
        },

        dark: {
          bg: '#0a0e27',
          card: '#141932',
          border: '#1e2844',
        }
      },

      fontFamily: {
        display: ['Orbitron', 'monospace'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
