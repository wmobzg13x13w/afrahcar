/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    spacing: {
      px: "1px",
      0: "0rem",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
    },
    colors: {
      orange: {
        light: "#FFA500",
        DEFAULT: "#FF8C00",
        dark: "#FF6F52",
      },
      white: {
        DEFAULT: "#FFFFFF",
        light: "#F8F8F8",
        dark: "#EAEAEA",
      },
      darkBlue: {
        light: "#1B2532",
        DEFAULT: "#1E40AF",
        dark: "#0C111D",
      },
      grey: {
        light: "#D1D5DB",
        DEFAULT: "#F2F4F7",
        dark: "#374151",
        grey: "#475467",
      },
      yellow: {
        light: "#FBBF24",
        DEFAULT: "#F59E0B",
        dark: "#D97706",
      },
      black: {
        DEFAULT: "#000000",
        light: "#333333",
        dark: "#0C111D",
      },
    },
    extend: {
      fontFamily: {
        sans: ["rale", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
