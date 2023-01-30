/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./public/index.html','./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
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
