/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Instrument Serif', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#07080b',
        graphite: '#12151c',
        brass: '#d7a557',
        ember: '#f07f4f',
        cyanite: '#55c7c5',
      },
      boxShadow: {
        glow: '0 0 45px rgba(85, 199, 197, 0.14)',
      },
      animation: {
        'slow-pulse': 'slowPulse 5s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        slowPulse: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
