/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        safe: "env(safe-area-inset-bottom)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        marsai: {
          primary: "#3b82f6",
          "primary-content": "#ffffff",
          secondary: "#7c3aed",
          "secondary-content": "#ffffff",
          accent: "#8b5cf6",
          "accent-content": "#ffffff",
          neutral: "#111827",
          "neutral-content": "#9ca3af",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
          "base-content": "#f3f4f6",
          info: "#38bdf8",
          "info-content": "#ffffff",
          success: "#4ade80",
          "success-content": "#ffffff",
          warning: "#fbbf24",
          "warning-content": "#000000",
          error: "#f87171",
          "error-content": "#ffffff",
          "--rounded-box": "1.5rem",
          "--rounded-btn": "1rem",
          "--rounded-badge": "1rem",
          "--btn-focus-scale": "0.98",
        },
      },
    ],
  },
};
