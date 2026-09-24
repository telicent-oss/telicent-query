module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Or 'media'
  variants: {
    extend: {
      backgroundColor: ['even', 'odd'],
    },
  },
  plugins: [],
};
