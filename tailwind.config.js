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
          // inverted: 'var(--color-text-inverted)',
        },
      },
      backgroundColor: {
        skin: {
          'main-bg': 'var(--color-bg-base)',
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
    },
  },
  plugins: [],
};
