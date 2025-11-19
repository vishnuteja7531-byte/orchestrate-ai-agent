import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        winter: {
          100: '#F5F7FA', // Frost White
          200: '#E3EAF0', // Border
          300: '#D0E2F2', // Misty Blue Start
          400: '#A0BEDC', // Misty Blue End
          500: '#A8C7E7', // Icy Blue (Primary)
          600: '#6B7B8C', // Soft Slate Gray
          700: '#4A90E2', // Cool Cyan Accent
          900: '#2D3A45', // Deep Slate Text
        }
      }
    }
  },
  plugins: [],
}
export default config