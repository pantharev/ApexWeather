import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lightBlue: '#ADD8E6',
        skyBlue: '#87CEEB',
        dodgerBlue: '#1E90FF',
        royalBlue: '#4169E1',
        mediumBlue: '#0000CD',
        darkBlue: '#00008B',
        navyBlue: '#000080',
        slateBlue: '#6A5ACD',
        steelBlue: '#4682B4',
        tealBlue: '#008080',
        lightGray: '#F5F5F5',
        aliceBlue: '#F0F8FF',
        lavenderBlue: '#E6E6FA',
        lightBlueGradientStart: '#E6F7FF',
        lightBlueGradientEnd: '#B3D9FF',
      },
    },
  },
  plugins: [],
};
export default config;
