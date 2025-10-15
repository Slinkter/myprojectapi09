/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        neutral: 'var(--color-neutral)',
        'text-base': 'var(--color-text-base)',
        'text-muted': 'var(--color-text-muted)',
        'bg-base': 'var(--color-bg-base)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'primary': '0 4px 14px 0 rgba(197, 48, 48, 0.5)',
      },
    },
  },
  plugins: [],
}
