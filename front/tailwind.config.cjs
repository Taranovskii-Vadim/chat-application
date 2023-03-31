/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        '1/10': '10%',
        '9/10': '90%',
      },
      minWidth: {
        5: '20px',
      },
    },
  },
  plugins: [],
};
