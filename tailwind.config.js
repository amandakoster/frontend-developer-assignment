/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to all of your components
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005ABB', // Primary Blue
        secondary: '#004B8D', // Secondary Blue (might be replaced with mustard)
        mustardYellow: '#FFC107', // Mustard Yellow for truck classification
        lightGray: '#F5F5F5', // Light Gray
        darkGray: '#333333', // Dark Gray
        accentGreen: '#66BB6A', // Accent Green
      },
    },
  },
  plugins: [],
}
