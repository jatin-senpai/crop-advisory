/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#16a34a", // green-600
                secondary: "#ca8a04", // yellow-600
                dark: "#1c1917", // stone-900
            }
        },
    },
    plugins: [],
}
