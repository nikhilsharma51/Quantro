/**@type{import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins : ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#3b82f6",
      },
    },
  },
  plugins: [],
};
