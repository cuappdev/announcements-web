import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sfprodisplay: ["var(--font-sfprodisplay)"],
      },
      colors: {
        blue: {
          100: "#E7F2F7",
          200: "#CEE6F0",
          300: "#9DCCE0",
          400: "#6CB3D1",
          500: "#3B99C1",
          600: "#0A80B2",
          700: "#08668E",
          800: "#064D6B",
          900: "#043347",
        },
        green: {
          100: "#EAF3EB",
          200: "#D6E7D7",
          300: "#ACCEAF",
          400: "#83B688",
          500: "#599D60",
          600: "#308538",
          700: "#266A2D",
          800: "#1D5022",
          900: "#133516",
        },
        yellow: {
          100: "#FDF6E6",
          200: "#FBEECC",
          300: "#F7DC99",
          400: "#F2CB66",
          500: "#EEB933",
          600: "#EAA800",
          700: "#BB8600",
          800: "#8C6500",
          900: "#5E4300",
        },
        red: {
          100: "#FAECEB",
          200: "#F4D9D7",
          300: "#EAB3AF",
          400: "#DF8E88",
          500: "#D56860",
          600: "#CA4238",
          700: "#A2352D",
          800: "#792822",
          900: "#511A16",
        },
        neutral: {
          100: "#E1E4E8",
          200: "#D1D5DA",
          300: "#959DA5",
          400: "#6A737D",
          500: "#586069",
          600: "#444D56",
          700: "#2F363D",
          800: "#24292E",
          900: "#1B1F23",
          white: "#FFFFFF",
          black: "#000000",
        },
        other: {
          stroke: "#E5E6EA",
          background: "#EFF1F4",
          offWhite: "#FAFAFA",
          highlight: "#BACCFA",
        },
      },
    },
  },
  plugins: [],
};
export default config;
