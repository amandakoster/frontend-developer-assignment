/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to all of your components
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005ABB', // car
        secondary: '#004B8D', 
        mustardYellow: '#FFC107', // truck
        lightGray: '#F5F5F5',
        darkGray: '#333333',
        accentGreen: '#66BB6A',// bike
        purple: "#800080",// bus
        salmon: "#e57070",
        yellowGreen : "#A5C659",
        blueYellow : "#3A84A5",
      },
    },
  },
 plugins: [
    require('@ellreka/tailwindcss-nth-child')(['even', 'odd']),
  ],
};
