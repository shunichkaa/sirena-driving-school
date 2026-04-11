import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: "#1A56DB",
        accentStrong: "#1E3A8A",
        ink: "#111827",
        muted: "#6B7280",
        subtle: "#9CA3AF",
        surface: "#F0F4FF",
        surfaceBar: "#F3F4F6",
        success: "#16A34A",
        wash: "#E5E7EB",
        canvas: "#FAFAFA",
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
