import type {Config} from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "15px"
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "960px",
            xl: "1200px"
        },
        fontFamily: {
            primary: "var(--font-jetbrainsMono)"
        },
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            backdropBlur: {
                xs: '2px',
                '2xl': '40px',
                '3xl': '64px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                'glow': '0 0 20px rgba(70, 157, 137, 0.4)',
                'glow-lg': '0 0 40px rgba(70, 157, 137, 0.5)',
                'glow-xl': '0 0 60px rgba(70, 157, 137, 0.6)',
            },
            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"}
                },
                "accordion-up": {
                    to: {height: "0"},
                    from: {height: "var(--radix-accordion-content-height)"}
                },
                "gradient-shift": {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(70, 157, 137, 0.4)" },
                    "50%": { boxShadow: "0 0 40px rgba(70, 157, 137, 0.7)" },
                },
                "shimmer": {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "typing": {
                    "0%": { width: "0" },
                    "100%": { width: "100%" },
                },
                "blink": {
                    "50%": { borderColor: "transparent" },
                },
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.9)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "neon-flicker": {
                    "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
                        textShadow: "0 0 10px rgba(70,157,137,0.6), 0 0 25px rgba(70,157,137,0.35)",
                    },
                    "20%, 24%, 55%": { textShadow: "none" },
                },
                "border-rotate": {
                    "0%":   { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "gradient-shift": "gradient-shift 6s ease infinite",
                "float": "float 3s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
                "typing": "typing 3.5s steps(40, end)",
                "blink": "blink 0.75s step-end infinite",
                "fade-in-up": "fade-in-up 0.6s ease-out forwards",
                "scale-in": "scale-in 0.5s ease-out forwards",
                "neon-flicker": "neon-flicker 4s infinite",
                "border-rotate": "border-rotate 4s linear infinite",
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
