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
        // colors: {
        //     "default-color": "#111827",
        // },
        extend: {
            colors: {
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
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
export default config;
