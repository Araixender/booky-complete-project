/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#FFEDF3",
        primary: "#5A827E",
        secondary: "#B9D4AA",
        varient: "#FAFFCA",
      },
      fontFamily: {
        imp: "ImperialScript-Regular"
      }
    },
  },
  plugins: [],
}