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
          base: 'var(--color-text-base)',
          inverted: 'var(--color-bg-base)',
          // inverted: 'var(--color-text-inverted)',
        },
      },
      backgroundColor: {
        skin: {
          'main-bg': 'var(--color-bg-base)',
          primary: 'var(--color-text-base)',
          fill: 'var(--color-bg-base)',
          // fill: 'var(--color-fill)',
          // 'fill-inverted': 'var(--color-fill-inverted)',
          // 'button-accent': 'var(--color-button-accent)',
          // 'button-accent-hover': 'var(--color-button-accent-hover)',
        },
      },
      fontSize: {
        linkBase: [
          'var(--font-size-link-base)',
          'var(--font-line-height-base)',
        ],
        base: ['var(--font-size-base)', 'var(--font-line-height-base)'],
      },
      borderRadius: {
        base: '20px',
      },
      dropShadow: {
        big: '-4px 4px 18px rgba(18, 41, 36, 0.15)',
      },
      colors: {
        'primary-color': 'var(--color-text-base)',
      },
    },
  },
  plugins: [],
};
