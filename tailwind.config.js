/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "Segoe UI", "sans-serif"],
        body: ["Manrope", "Segoe UI", "sans-serif"],
      },
      colors: {
        night: "#050816",
        ink: "#0b1020",
        neon: "#56f0ff",
        violet: "#8b5cf6",
        cobalt: "#1d4ed8",
        mist: "#cdd8f6",
      },
      boxShadow: {
        glass: "0 24px 70px rgba(15, 23, 42, 0.45)",
        neon: "0 0 0 1px rgba(86,240,255,0.15), 0 18px 45px rgba(17,24,39,0.42)",
      },
      backgroundImage: {
        aura: "radial-gradient(circle at top, rgba(86,240,255,0.18), transparent 35%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.18), transparent 30%), linear-gradient(135deg, #050816 0%, #0b1020 55%, #050816 100%)",
        mesh: "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.10), transparent 25%), radial-gradient(circle at 80% 0%, rgba(99,102,241,0.14), transparent 30%), radial-gradient(circle at 50% 100%, rgba(14,165,233,0.12), transparent 22%)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 0 1px rgba(86,240,255,0.12), 0 18px 45px rgba(17,24,39,0.42)" },
          "50%": { boxShadow: "0 0 0 1px rgba(86,240,255,0.24), 0 24px 60px rgba(17,24,39,0.55)" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
