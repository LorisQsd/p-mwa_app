import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-img': "url('/bg-img.png')"
      },
      colors: {
        primary: {
          200: '#5aed8b',
          400: '#39EC75',
          700: '#09bd45'
        },
        secondary: {
          400: "#17181E"
        }
      },
      boxShadow: {
        'custom': '0 4px 10px 0px rgba(57, 236, 117, 0.25);',
      }
    },
  },
  plugins: [],
}
export default config
