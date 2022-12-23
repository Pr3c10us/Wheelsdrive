/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                sm: '600px',
            },
            backgroundImage: {
                hero: "url('/src/assets/background.png')",
            },
        },
    },
    plugins: [],
};
