/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to all of your components
  ],
  theme: {
   extend: {
      colors: {
        primary: '#005ABB', // Primary Blue
        secondary: '#004B8D', // Secondary Blue
        lightGray: '#F5F5F5', // Light Gray
        darkGray: '#333333', // Dark Gray
        accentGreen: '#66BB6A', // Accent Green
        accentYellow: '#FFEB3B', // Accent Yellow
      },
    },
  },
  plugins: [],
}
