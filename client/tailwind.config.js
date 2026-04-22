/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
    keyframes: {
      popIn: {
        "0%": { transform: "scale(0.9)", opacity: "0" },
        "100%": { transform: "scale(1)", opacity: "1" },
      },
    },
    animation: {
      popIn: "popIn 0.2s ease-out",
    },
    transitionDuration: {
      400: "400ms",
    },
  },
  },
  plugins: [],
};