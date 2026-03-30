/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fdf0f6',
          100: '#fce3ef',
          200: '#f9c8e0',
          300: '#f5a3cc',
          400: '#f17bab',
          500: '#e9347d',
          600: '#d42070',
          700: '#b01560',
          800: '#8c1050',
          900: '#670a3c',
        },
        forest: {
          50:  '#eef7f4',
          100: '#d4ece5',
          200: '#9ebd9c',
          300: '#77a394',
          400: '#5a8a7a',
          500: '#486a5e',
          600: '#374d20',
          700: '#2d3d1a',
          800: '#1a2e1e',
          900: '#0f1e12',
        },
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        talking: 'talking 0.65s ease-in-out infinite',
        'bubble-in': 'bubbleIn 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'talk-glow': 'talkGlow 0.65s ease-in-out infinite',
        'avatar-enter': 'avatarEnter 0.7s ease-out forwards',
        'avatar-exit': 'avatarExit 0.5s ease-in forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1) translateY(0px)' },
          '50%': { transform: 'scale(1.018) translateY(-8px)' },
        },
        talking: {
          '0%, 100%': { transform: 'scale(1) translateY(0px) rotate(0deg)' },
          '10%': { transform: 'scale(1.012) translateY(-3px) rotate(-0.8deg)' },
          '25%': { transform: 'scale(1.02) translateY(-7px) rotate(0.6deg)' },
          '40%': { transform: 'scale(1.01) translateY(-2px) rotate(-0.5deg)' },
          '55%': { transform: 'scale(1.018) translateY(-6px) rotate(0.7deg)' },
          '70%': { transform: 'scale(1.012) translateY(-3px) rotate(-0.4deg)' },
          '85%': { transform: 'scale(1.02) translateY(-7px) rotate(0.5deg)' },
        },
        bubbleIn: {
          '0%': { transform: 'scale(0.3) translateY(15px)', opacity: '0' },
          '65%': { transform: 'scale(1.06) translateY(-3px)', opacity: '1' },
          '85%': { transform: 'scale(0.97) translateY(1px)' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        talkGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 50px rgba(168, 85, 247, 0.95))' },
        },
        avatarEnter: {
          from: { opacity: '0', transform: 'scale(0.8) translateY(30px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        avatarExit: {
          from: { opacity: '1', transform: 'scale(1) translateX(0)' },
          to: { opacity: '0', transform: 'scale(0.75) translateX(-40px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
