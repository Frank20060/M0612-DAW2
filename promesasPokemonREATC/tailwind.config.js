/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EF4444", // Rojo
        secondary: "#000000", // Negro
        accent: "#FFFFFF", // Blanco
      },
    },
  },
  plugins: [],
};
