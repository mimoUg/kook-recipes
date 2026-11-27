/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                appAccent: {
                    DEFAULT: '#D9FAA1',
                    dark: '#B2CF81',
                },
                appText: '#181A2C',
                appGray: {
                    100: '#E6E6E6',
                    200: '#E0E0E0',
                    300: '#D1D1D1',
                    400: '#989898',
                    500: '#696A6C',
                    600: '#5B5B5E',
                },
                appWarning: '#FC5E5E',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    lg: '2rem',
                },
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1280px',
                    '2xl': '1360px',
                },
            },
            boxShadow: {
                float: '0 18px 50px rgba(24, 26, 44, 0.08)',
            },
        },
    },
    plugins: [],
};
