/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flip1: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        flip2: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(24px)" },
        },
        flip3: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },
      animation: {
        flip1: "flip1 0.6s infinite cubic-bezier(0,1,1,0)",
        flip2: "flip2 0.6s infinite cubic-bezier(0,1,1,0)",
        flip3: "flip3 0.6s infinite cubic-bezier(0,1,1,0)",
      },
    },
  },
  plugins: [],
}

