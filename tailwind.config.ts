import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'white': 'var(--color-white)',
        'dark-1': 'var(--color-dark-1)', // #03045e
        'dark-2': 'var(--color-dark-2)', // #090c9b
        'blue-1': 'var(--color-blue-1)', // #3066be
        'blue-2': 'var(--color-blue-2)', // #00a8e8
        'error': 'var(--color-error)',   // #dc2626
        
        // Nombres semánticos para el Panel
        'primary': 'var(--color-dark-1)',
        'secondary': 'var(--color-dark-2)', 
        'accent': 'var(--color-blue-2)',
        'accent-hover': 'var(--color-blue-1)',
        'background': 'var(--color-white)',
        'foreground': 'var(--color-dark-1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config