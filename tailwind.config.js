/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Red (OSH)
    'bg-red-900/30', 'text-red-400', 'text-red-500', 'hover:border-red-500/50', 'group-hover:text-red-400',
    // Blue (Automotive)
    'bg-blue-900/30', 'text-blue-400', 'text-blue-500', 'hover:border-blue-500/50', 'group-hover:text-blue-400',
    // Purple (Soft Skills)
    'bg-purple-900/30', 'text-purple-400', 'text-purple-500', 'hover:border-purple-500/50', 'group-hover:text-purple-400',
    // Emerald (IT)
    'bg-emerald-900/30', 'text-emerald-400', 'text-emerald-500', 'hover:border-emerald-500/50', 'group-hover:text-emerald-400',
    // Orange (CX)
    'bg-orange-900/30', 'text-orange-400', 'text-orange-500', 'hover:border-orange-500/50', 'group-hover:text-orange-400',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
}
