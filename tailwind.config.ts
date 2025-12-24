import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
        heading: ['Kalice', 'Playfair Display', 'Georgia', 'serif'],
        body: ['Santana', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        nav: ['PP Fragment', 'Inter', 'sans-serif'],
      },
      colors: {
        // Brand Colors
        'night-green': 'hsl(155 22% 16%)',
        'slate-moss': 'hsl(155 10% 32%)',
        'stone': 'hsl(60 3% 78%)',
        'ivory': 'hsl(60 30% 98%)',
        // Pastel Accents
        'pear': 'hsl(72 46% 83%)',
        'lavender': 'hsl(270 33% 66%)',
        'mauve': 'hsl(280 33% 79%)',
        'blush': 'hsl(20 18% 88%)',
        // Extended palette for cinematic effects
        'deep-forest': 'hsl(155 28% 10%)',
        'moss-glow': 'hsl(72 50% 75%)',
        'gold-accent': 'hsl(45 80% 60%)',
        // Semantic
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'cinematic': '0 25px 50px -12px hsl(155 22% 16% / 0.25)',
        'cinematic-lg': '0 35px 60px -15px hsl(155 22% 16% / 0.35)',
        'glow': '0 0 40px hsl(72 46% 83% / 0.3)',
        'glow-lg': '0 0 60px hsl(72 46% 83% / 0.4)',
        'inner-glow': 'inset 0 0 30px hsl(72 46% 83% / 0.1)',
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
        "fade-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-left": {
          from: { opacity: "0", transform: "translateX(-60px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-right": {
          from: { opacity: "0", transform: "translateX(60px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(100px) scale(0.95)", filter: "blur(10px)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)", filter: "blur(0)" },
        },
        "reveal-left": {
          from: { opacity: "0", transform: "translateX(-100px)", filter: "blur(8px)" },
          to: { opacity: "1", transform: "translateX(0)", filter: "blur(0)" },
        },
        "reveal-right": {
          from: { opacity: "0", transform: "translateX(100px)", filter: "blur(8px)" },
          to: { opacity: "1", transform: "translateX(0)", filter: "blur(0)" },
        },
        "scale-reveal": {
          from: { opacity: "0", transform: "scale(0.8)", filter: "blur(5px)" },
          to: { opacity: "1", transform: "scale(1)", filter: "blur(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "line-grow": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "parallax-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(1deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-left": "slide-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-right": "slide-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 40s linear infinite",
        "slow-zoom": "slow-zoom 20s ease-in-out infinite alternate",
        float: "float 4s ease-in-out infinite",
        "reveal-up": "reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "reveal-left": "reveal-left 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "reveal-right": "reveal-right 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-reveal": "scale-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "line-grow": "line-grow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "text-shimmer": "text-shimmer 4s linear infinite",
        "parallax-float": "parallax-float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;