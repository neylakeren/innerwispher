/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Inner Whisper Lavender Palette
        'lv': '#8f78d8',
        'lvd': '#4b3b86',
        'lvl': '#efeafb',
        'lvm': '#d9cff5',
        'ink': '#2b2542',

        'primary': '#8f78d8',
        'primary-dark': '#4b3b86',
        'primary-light': '#efeafb',
        'primary-border': '#d9cff5',
        'primary-container': '#efeafb',
        'on-primary': '#ffffff',
        'on-primary-container': '#4b3b86',

        'secondary': '#5d5577',
        'secondary-container': '#efeafb',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#4b3b86',

        'background': '#f7f4fd',
        'on-background': '#2b2542',

        'surface': '#ffffff',
        'on-surface': '#2b2542',
        'on-surface-variant': '#5d5577',
        'surface-container': '#efeafb',
        'surface-container-low': '#f3eeff',
        'surface-container-high': '#e5dcfa',
        'surface-container-highest': '#dad0f7',
        'surface-container-lowest': '#ffffff',

        'outline': '#8f78d8',
        'outline-variant': '#d9cff5',

        'error': '#dc3545',
        'error-container': '#fce8e9',
        'on-error': '#ffffff',
        'on-error-container': '#9b1c28',

        'success': '#198754',
        'success-container': '#d1e7dd',
      },
      fontFamily: {
        'quicksand': ['Quicksand', 'Plus Jakarta Sans', 'sans-serif'],
        'jakarta': ['Quicksand', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 6px 22px rgba(75, 59, 134, 0.07)',
        'btn': '0 6px 16px rgba(143, 120, 216, 0.35)',
        'hero': '0 12px 30px rgba(127, 102, 207, 0.3)',
        'glow': '0 0 24px rgba(143, 120, 216, 0.35)',
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '18px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
