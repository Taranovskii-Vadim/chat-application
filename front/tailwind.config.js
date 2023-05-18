/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        '1/10': '10%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
      },
      minWidth: {
        5: '20px',
      },
    },
  },
  plugins: [],
};
