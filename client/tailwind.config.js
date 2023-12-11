/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#FFEAA1",
                secondary: "#9fe870",
                white: "#FFFFFF",
                black: "#101214",
                gray: "#30353b",
            },
            boxShadow: {
                surrounding: "0px 0px 10px 5px",
            },
        },
    },
    plugins: [],
};
