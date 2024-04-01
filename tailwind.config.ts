import type { Config } from 'tailwindcss'

import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: 'hsl(var(--accent))',
        background: 'hsl(var(--background))',
        border: 'hsl(var(--border))',
        code: {
          DEFAULT: 'hsl(var(--code))',
          highlight: 'hsl(var(--code-highlight))',
        },
        dock: {
          DEFAULT: 'hsl(var(--dock))',
          foreground: 'hsl(var(--dock-foreground))',
          icon: 'hsl(var(--dock-icon))',
          border: 'hsl(var(--dock-border))',
        },
        foreground: 'hsl(var(--foreground))',
      },
      fontFamily: {
        heading: ['var(--font-cabinet)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-satoshi)', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        h1: 'var(--heading-1)',
        h2: 'var(--heading-2)',
        h3: 'var(--heading-3)',
        h4: 'var(--heading-4)',
      },
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
}

export default config
