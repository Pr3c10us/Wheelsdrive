/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                '2xs': '300px',
                xs: '400px',
                nsm: '700px',
                sm: '600px',
                md: '800px',
                lg: '1150px',
            },
            backgroundImage: {
                hero: "url('/src/assets/background.png')",
            },
        },
    },
    plugins: [],
};
