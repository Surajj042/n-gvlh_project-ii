import type { Config } from "tailwindcss";

import { withUt } from "uploadthing/tw";

export default withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      vs: [
        "0.75rem", // 12px
        {
          lineHeight: "1rem",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
      sm: [
        "0.875rem", // 14px
        {
          lineHeight: "1.25rem",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
      md: [
        "1rem", // 16px
        {
          lineHeight: "1.5rem",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
      lg: [
        "1.125rem", // 18px
        {
          lineHeight: "1.75rem",
          letterSpacing: "-0.005em",
          fontWeight: "500",
        },
      ],

      xl: [
        "1.3rem",
        {
          lineHeight: "1.6rem",
          letterSpacing: "-0.01em",
          fontWeight: "500",
        },
      ],
      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
          letterSpacing: "-0.01em",
          fontWeight: "500",
        },
      ],
      "3xl": [
        "1.875rem",
        {
          lineHeight: "2.25rem",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        },
      ],
      "4xl": [
        "2.5rem",
        {
          lineHeight: "2.6rem",
          letterSpacing: "-0.02em",
        },
      ],
      "24sb": [
        "1.6rem",
        {
          lineHeight: "1.6rem",
          letterSpacing: "-0.02em",
        },
      ],
    },
    extend: {
      colors: {
        dark: {
          100: "#000000",
          200: "#0F1117",
          300: "#151821",
          400: "#212734",
          500: "#101012",
          1: "#1C1F2E",
          2: "#161925",
          3: "#252A41",
          4: "#1E2757",
        },
        light: {
          900: "#FFFFFF",
          800: "#F4F6F8",
          850: "#FDFDFD",
          700: "#DCE3F1",
          500: "#7B8EC8",
          400: "#858EAD",
        },
        blue: {
          1: "#0E78F9",
        },
        sky: {
          1: "#C9DDFF",
          2: "#ECF0FF",
          3: "#F5FCFF",
        },
        orange: {
          1: "#FF742E",
        },
        purple: {
          1: "#830EF9",
        },
        yellow: {
          1: "#F9A90E",
        },
        "accent-blue": "#1DA1F2",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          500: "#840c68",
          100: "#ffd6d2",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        spaceGrotesk: ["var(--font-spaceGrotesk)"],
      },
      boxShadow: {
        "light-100":
          "0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), opx 2px 4ppx 0px rggba(184, 184, 184, 0.03)",
        "light-200": "10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
        "light-300": "-10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
        "dark-100": "0px 2px 10px 0px rgba(46, 52, 56, 0.10)",
        "dark-200": "2px 0px 20px 0px rgba(39, 36, 36, 0.04)",
        custom: "0 45px 65px rgba(0, 0, 0, 0.15)",
      },
      backgroundImage: {
        "auth-dark": "url('/assets/images/auth-dark.png')",
        "auth-light": "url('/assets/images/auth-light.png')",
        hero: "url('/meeting/meeting-background.png')",
        "dark-gradient": "linear-gradient(0, #ffefba 0, #ffffff 100%)",
        purple2red: "linear-gradient(129deg, #ad00ff 0%, #e25f5f 100%)",
        yellow2pink: "linear-gradient(129deg, #ffed46 0%, #ff62c0 100%)",
        purple2blue: "linear-gradient(129deg, #7000ff 0%, #5f9be2 100%)",
        pink2blue: "linear-gradient(129deg, #e10062 0%, #38166d 100%)",
        lyellow2lpink: "linear-gradient(129deg, #ffefbb 0%, #ffc2e5 100%)",
        cyan2blue: "linear-gradient(135deg, #26ECE4 0%, #1704A9 100%)",
      },
      screens: {
        vs: "400px",
        xs: "420px", // Custom small screen breakpoint
        sm: "640px", // Small screens (mobile)
        md: "768px", // Medium screens (tablet)
        mmd: "890px",
        lg: "1024px", // Large screens (laptop)
        xl: "1280px", // Extra large screens (desktop)
        "2xl": "1536px", // 2x extra large screens (large desktop)
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config);
