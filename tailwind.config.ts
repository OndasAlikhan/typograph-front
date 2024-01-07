import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                primary: "1px 3px 10px 0px rgba(0, 0, 0, 0.15)",
            },
            colors: {
                "background-primary": "#E1DFDD",
                "default-color": colors.slate[900],
                "secondary-color": colors.slate[700],
                "accent-color": colors.indigo,
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                sans: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
export default config;
