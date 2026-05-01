/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cute: {
          primary: '#3182F6',
          bg: '#F9F9F9',
          card: '#FFFFFF',
          text: '#191F28',
          subtext: '#6B7684',
          border: '#E5E8EB',
          accent: '#FF6B6B',
          soft: '#F2F4F6',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Apple SD Gothic Neo',
          'Pretendard Variable',
          'Pretendard',
          'system-ui',
          'sans-serif',
        ],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'card-flip': 'cardFlip 0.6s ease-out',
        shake: 'shake 0.5s ease-in-out',
        pop: 'pop 0.3s ease-out',
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
        cardFlip: {
          '0%': { transform: 'rotateY(90deg) scale(0.8)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg) scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px) rotate(-2deg)' },
          '40%': { transform: 'translateX(6px) rotate(2deg)' },
          '60%': { transform: 'translateX(-4px) rotate(-1deg)' },
          '80%': { transform: 'translateX(4px) rotate(1deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
