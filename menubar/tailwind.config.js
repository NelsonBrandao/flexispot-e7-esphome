const errorRedStyle = {
  fill: 'rgb(239 68 68)',
  color: 'rgb(239 68 68)',
  'background-color': 'rgb(254 226 226)',
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        error: 'error 300ms ease-in 2',
      },
      keyframes: {
        error: {
          '0%,100%': { ...errorRedStyle, transform: 'translateX(0)' },
          '25%,75%': { ...errorRedStyle, transform: 'translateX(5%)' },
          '50%': { ...errorRedStyle, transform: 'translateX(-5%)' },
        },
      },
    },
  },
  plugins: [],
};
