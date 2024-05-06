import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "390px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      black: "#000",
      white: "#fff",
      grey: {
        100: "#F0F0F0",
        300: "#979797",
        500: "#747474",
        700: "#585858",
        900: "#313131",
      },
      primary: "#3BD4AE",
      disabled: "#979797",
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    extend: {
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
