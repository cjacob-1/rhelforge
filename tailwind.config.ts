import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rhel-red': '#EE0000',
        'dark-bg': '#0a0e27',
        'dark-card': '#111827',
        'dark-border': '#1f2937',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
