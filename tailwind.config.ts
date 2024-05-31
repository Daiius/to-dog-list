import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
	darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
			animation: {
				'come-and-eat': 'come 5s',
			},
			keyframes: {
				come: {
					'0%': 	 { opacity: '0', transform: 'translateX(100%)' },
					'52.5%': { opacity: '1', transform: 'translateX(-0%)' },
					'55%': 	 { opacity: '1', transform: 'translate(-0%,20px)' },
					'60%': 	 { opacity: '1', transform: 'translate(-0%, 0px)' },
					'62.5%': { opacity: '1', transform: 'translate(-0%,20px)' },
					'65%': 	 { opacity: '1', transform: 'translate(-0%, 0px)' },
					'67.5%': { opacity: '1', transform: 'translate(-0%,20px)' },
					'70%': 	 { opacity: '1', transform: 'translate(-0%, 0px)' },
					'100%':  { opacity: '1', transform: 'translate(-150vw, 0px)' },
				},
				//bounce: {
				//	'0%': { 'translateY(0)' },
				//	'100%': { 'translateY(20px)' },
				//},
			},
    },
  },
  plugins: [],
};
export default config;

