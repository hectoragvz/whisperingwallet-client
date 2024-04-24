/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "apple-grey": "#f3f2f9",
      },
    },
    plugins: [],
  },
};
