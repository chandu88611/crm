/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#687cfe",
        secondary: "#ff7f5d",
        success: "#3cd188",
        info: "#0ac7fb",
        warning: "#efae4e",
        danger: "#f7666e",
        light: "#f3f6f9",
        dark: "#272a3a",
        btn_primary: "#687cfe",
        btn_secondary: "#ff7f5d",
        btn_success: "#3cd188",
        btn_info: "#0ac7fb",
        btn_warning: "#efae4e",
        btn_danger: "#f7666e",
        btn_light: "#f3f6f9",
        btn_dark: "#272a3a",
      },
    },
  },
  plugins: [],
};
