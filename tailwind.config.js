/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arena: {
          bg: "#071312",
          surface: "#0B1A17",
          card: "#0D1F1C",
          hover: "#122A26",
          border: "#17332D",
          borderLight: "rgba(25, 211, 174, 0.25)",
        },
        teal: {
          electric: "#19D3AE",
          glow: "#16B897",
          dark: "#0F766E",
        },
        emerald: {
          rpg: "#8BE28B",
          bright: "#34D399",
          deep: "#059669",
        },
        gold: {
          amber: "#F4B942",
          glow: "#FCD34D",
          dark: "#D97706",
        },
        coral: {
          warm: "#FF7657",
          glow: "#FB923C",
          dark: "#DC2626",
        },
        light: {
          text: "#F3F6F4",
          muted: "#9CA3AF",
          subtle: "#6B7280",
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-teal': '0 0 20px -3px rgba(25, 211, 174, 0.35)',
        'glow-teal-lg': '0 0 35px -5px rgba(25, 211, 174, 0.45)',
        'glow-emerald': '0 0 20px -3px rgba(139, 226, 139, 0.35)',
        'glow-gold': '0 0 20px -3px rgba(244, 185, 66, 0.35)',
        'glow-coral': '0 0 20px -3px rgba(255, 118, 87, 0.35)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
//