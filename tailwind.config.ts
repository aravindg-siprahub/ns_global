import type { Config } from 'tailwindcss';

/**
 * Design tokens. Colours are CSS variables (RGB channels) defined in
 * app/globals.css so dark (default) and light themes swap at runtime.
 */
const c = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    extend: {
      colors: {
        ink: c('--c-bg'),
        surface: c('--c-surface'),
        elevated: c('--c-elevated'),
        fg: c('--c-fg'),
        muted: c('--c-muted'),
        line: c('--c-line'),
        accent: c('--c-accent'),
        accent2: c('--c-accent2'),
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-body)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // fluid display scale: 48px mobile → 140px desktop
        hero: ['clamp(3rem, 9vw, 8.75rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2.75rem, 6.5vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 4.8vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem, 3.2vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        statement: ['clamp(1.75rem, 3.6vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        label: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.12em' }],
      },
      spacing: {
        // 8px system helpers (Tailwind's default 4px scale also stays available)
        section: 'clamp(6rem, 12vw, 11rem)',
        gutter: 'clamp(1rem, 4vw, 3rem)',
      },
      maxWidth: { content: '1440px' },
      borderRadius: { xl2: '0px', xl3: '0px' },
      transitionTimingFunction: { premium: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      transitionDuration: { 800: '800ms', 1200: '1200ms' },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(rgb(var(--c-accent)), rgb(var(--c-accent)))',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'mesh-shift': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-4%,3%,0) scale(1.08)' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(18px)', opacity: '0' },
        },
        pulse2: { '0%': { transform: 'scale(1)', opacity: '0.8' }, '100%': { transform: 'scale(3.2)', opacity: '0' } },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'mesh-shift': 'mesh-shift 18s cubic-bezier(0.16,1,0.3,1) infinite',
        'scroll-dot': 'scroll-dot 1.8s cubic-bezier(0.16,1,0.3,1) infinite',
        pulse2: 'pulse2 2.4s cubic-bezier(0.16,1,0.3,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
