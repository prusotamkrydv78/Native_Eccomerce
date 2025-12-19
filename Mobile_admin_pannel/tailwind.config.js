/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: "#F83758",
      "primary-hover": "#d62f4d",
      secondary: "#2A2C36",
      "background-light": "#F9FAFB",
      "surface-light": "#ffffff",
      "text-primary": "#171717",
      "text-secondary": "#6B7280",
    },
  },
  plugins: [],
};
