/** @type {import('tailwindcss').Config} */
module.exports = {
    // darkMode : false ,
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ['"Inter"', 'sans-serif'],
                urbanist: ['"Urbanist"', 'sans-serif'],
                livvic: ['"Livvic"', 'sans-serif'],
            },
            container : {
                center : true ,
                screens : {
                    'sm': '100%', 
                    'md': '100%',  
                    'lg': '950px', 
                    'xl': '1150px', 
                    '2xl': '1250px', 
                }
            } ,
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                background: "var(--background)",
                dark1: "var(--dark1)",
                dark2: "var(--dark2)",
                gray1: "var(--gray1)",
                gray2: "var(--gray2)",
                gray3: "var(--gray3)",
                light: "var(--light)",
                light2: "var(--light2)",
                lighter: "var(--lighter)",
                pure: "var(--pure)",
                hint: "var(--hint)",
                gunmetal:"var(--gunmetal)",
                darkred:"var(--darkred)",
            },
            screens: {
                '2xl': '1550px', 
            'xs': '480px', 

            },
        },
    },
    plugins: [],
};
