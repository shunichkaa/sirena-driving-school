import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: "#FFB800",
        ink: "#0a0a0a",
        muted: "#5c5c5c",
        wash: "#f2f2f2",
        canvas: "#fafafa",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10, 10, 10, 0.04), 0 10px 28px rgba(10, 10, 10, 0.06)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
