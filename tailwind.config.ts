import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui"],
        heading: ["var(--font-fraunces)", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          50: "#e7e9ed",
          100: "#cfd3db",
          200: "#a0a7b7",
          300: "#707b93",
          400: "#414f6f",
          500: "#11234b", // Main Navy
          600: "#0e1c3c",
          700: "#0b152d",
          800: "#080e1e",
          900: "#05070f",
        },
        gold: {
          DEFAULT: "#F5B700",
          hover: "#D49E00",
        },
        sky: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fadeIn": "fadeIn 0.5s ease-out forwards",
        "fadeInUp": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 3s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 2s ease-in-out infinite",
        "typing-dot": "typingDot 1.4s infinite ease-in-out",
        "glow-pulse": "glowPulse 2.4s ease-in-out infinite",
        "tilt": "tilt 8s ease-in-out infinite",
        "orbit": "orbit 14s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        typingDot: {
          "0%, 80%, 100%": { transform: "scale(0)", opacity: "0" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(59, 130, 246, 0.25)" },
          "50%": { boxShadow: "0 0 0 10px rgba(59, 130, 246, 0)" },
        },
        tilt: {
          "0%, 100%": { transform: "rotateX(0deg) rotateY(0deg)" },
          "25%": { transform: "rotateX(2deg) rotateY(-3deg)" },
          "75%": { transform: "rotateX(-2deg) rotateY(3deg)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(36px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(36px) rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
