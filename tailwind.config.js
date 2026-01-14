import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          950: '#0a0a0a',
          900: '#1A1A1A',
          800: '#2A2A2A',
          700: '#333333',
          600: '#444444',
          500: '#666666',
          400: '#888888',
          300: '#AAAAAA',
          200: '#CCCCCC',
          100: '#EEEEEE',
          50: '#F5F5F5',
        }
      },
      fontSize: {
        'xxs': '0.65rem',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
