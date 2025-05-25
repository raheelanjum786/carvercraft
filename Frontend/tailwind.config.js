export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        funky: {
          pink: "#DE0157",
          teal: "#19D7E8",
          orange: "#FE832D",
          red: "#EE5442",
          green: "#36B583",
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-delayed": "float 10s ease-in-out 2s infinite",
        "slide-right": "slideRight 15s linear infinite",
        "slide-left": "slideLeft 15s linear infinite",
        "slide-up": "slideUp 15s linear infinite",
        "slide-down": "slideDown 15s linear infinite",
        particle: "particle 10s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 8s ease-in-out infinite",
        "pulse-slower": "pulse 12s ease-in-out infinite",
        "scan-horizontal": "scanHorizontal 8s ease-in-out infinite",
        "scan-horizontal-reverse":
          "scanHorizontalReverse 10s ease-in-out infinite",
        "subtle-shift": "subtleShift 20s linear infinite",
        "float-slow": "floatSlow 15s ease-in-out infinite",
        "float-medium": "floatMedium 10s ease-in-out infinite",
        "float-fast": "floatFast 7s ease-in-out infinite",
        wave: "wave 10s ease-in-out infinite",
        "pulse-ring": "pulseRing 6s ease-in-out infinite",
        "pulse-ring-delayed": "pulseRing 6s ease-in-out 3s infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "shooting-star": "shootingStar 5s ease-out infinite",
        "shooting-star-delayed": "shootingStar 5s ease-out 2.5s infinite",
        "float-cosmic": "floatCosmic 20s ease-in-out infinite",
        "nebula-pulse": "nebulaPulse 15s ease-in-out infinite",
        "cosmic-rotation": "spin 60s linear infinite",
        "cosmic-rotation-reverse": "spin 45s linear infinite reverse",
        aurora: "aurora 10s ease-in-out infinite",
        "hover-glow": "hoverGlow 3s ease-in-out infinite",
        orbit: "spin 20s linear infinite",
        "orbit-reverse": "spin 15s linear infinite reverse",
        "orbit-dot": "orbitDot 20s linear infinite",
        "orbit-dot-delayed": "orbitDot 20s linear infinite 10s",
        "scan-vertical": "scanVertical 8s ease-in-out infinite",
        "scan-vertical-reverse":
          "scanVertical 10s ease-in-out infinite reverse",
        "float-particle": "floatParticle 10s ease-in-out infinite",
        shine: "shine 1.5s ease-in-out",

        floatUp: "floatUp 5s ease-in-out forwards",

        "spin-slower": "spin 5s linear infinite",
        floatAround: "floatAround 10s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.05)" },
        },
        scanVertical: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "50%": { transform: "translateY(0)", opacity: 1 },
          "100%": { transform: "translateY(100%)", opacity: 0 },
        },
        floatParticle: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(10px, 10px)" },
          "50%": { transform: "translate(15px, 5px)" },
          "75%": { transform: "translate(5px, 15px)" },
        },
        shine: {
          "0%": { left: "-100%", opacity: 0.7 },
          "100%": { left: "100%", opacity: 0 },
        },
        slideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        floatUp: {
          "0%": { transform: "translateY(0)", opacity: 0 },
          "50%": { opacity: 0.5 },
          "100%": { transform: "translateY(-100px)", opacity: 0 },
        },
        floatAround: {
          "0%, 100%": { transform: "translate(0, 0)", opacity: 0 },
          "50%": { transform: "translate(30px, -30px)", opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
};
