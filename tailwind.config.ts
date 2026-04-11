import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: "#4B5E2E",
        accentStrong: "#3D4F26",
        ink: "#111827",
        muted: "#6B7280",
        subtle: "#9CA3AF",
        surface: "#F0F2EB",
        surfaceBar: "#EBEEE5",
        success: "#16A34A",
        wash: "#E2E6DC",
        canvas: "#F9FAF6",
      },
      boxShadow: {
        card: "0 1px 2px rgba(17, 24, 39, 0.05), 0 10px 28px rgba(17, 24, 39, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        measure: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;
