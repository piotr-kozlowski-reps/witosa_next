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
          // inverted: 'var(--color-text-inverted)',
        },
      },
      backgroundColor: {
        skin: {
          'main-bg': 'var(--color-background-base)',
          primary: 'var(--color-foreground-base)',
          fill: 'var(--color-background-base)',
          // fill: 'var(--color-fill)',
          // 'fill-inverted': 'var(--color-fill-inverted)',
          // 'button-accent': 'var(--color-button-accent)',
          // 'button-accent-hover': 'var(--color-button-accent-hover)',
        },
      },
      fontSize: {
        'base-13': ['var(--font-size-13)', 'var(--font-size-13-line-height)'],
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
    },
  },
  plugins: [],
};
