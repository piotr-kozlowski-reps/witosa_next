module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-foreground-base)',
          inverted: 'var(--color-background-base)',
          gray: 'var(--color-gray)',
          'cta-primary': 'var(--cta-primary)',
          'cta-secondary': 'var(--cta-secondary)',
          // inverted: 'var(--color-text-inverted)',
        },
      },
      backgroundColor: {
        skin: {
          'main-bg': 'var(--color-background-base)',
          primary: 'var(--color-foreground-base)',
          fill: 'var(--color-background-base)',
          gray: 'var(--color-gray)',
          'cta-primary': 'var(--cta-primary)',
          'cta-secondary': 'var(--cta-secondary)',
          // fill: 'var(--color-fill)',
          // 'fill-inverted': 'var(--color-fill-inverted)',
          // 'button-accent': 'var(--color-button-accent)',
          // 'button-accent-hover': 'var(--color-button-accent-hover)',
        },
      },
      fontSize: {
        'base-13': ['var(--font-size-13)', 'var(--font-size-13-line-height)'],
        'base-19': ['var(--font-size-19)', 'var(--font-size-19-line-height)'],
        base: ['var(--font-size-base)', 'var(--font-size-13-line-height)'],
      },
      borderRadius: {
        base: '20px',
      },
      dropShadow: {
        big: '-4px 4px 18px var(--color-shadow)',
        small: '-4px 4px 18px var(--color-shadow)',
      },
      colors: {
        'primary-color': 'var(--color-foreground-base)',
      },
      spacing: {
        'mobile-margin': '16px',
        'tablet-margin': '32px',
      },
      inset: {
        'mobile-for-absolute-margin': '16px',
        'tablet-for-absolute-margin': '32px',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              'font-size': 'var(--font-size-32)',
              'font-weight': 800,
              'line-height': 'var(--font-size-32-line-height)',
              color: 'var(--color-foreground-base)',
              'letter-spacing': '-1px',
            },
            h2: {
              'font-size': 'var(--font-size-32)',
              'font-weight': 400,
              'line-height': 'var(--font-size-32-line-height)',
              color: 'var(--color-foreground-base)',
              'letter-spacing': '-1px',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
