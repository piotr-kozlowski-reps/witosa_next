module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      tablet: '520px',
      desktop: '1280px',
      'slider-break-point': '870px',
    },
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-foreground-base)',
          inverted: 'var(--color-background-base)',
          gray: 'var(--color-gray)',
          'cta-primary': 'var(--cta-primary)',
          'cta-secondary': 'var(--cta-secondary)',
          error: 'var(--color-error)',
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
          error: 'var(--color-error)',
          'cta-secondary-opacity': 'var(--cta-secondary-opacity)',
        },
      },
      fontSize: {
        'size-small': [
          'var(--font-size-small)',
          'var(--font-size-small-line-height)',
        ],
        'size-normal': [
          'var(--font-size-normal)',
          'var(--font-size-normal-line-height)',
        ],
        'size-large': [
          'var(--font-size-large)',
          'var(--font-size-large-line-height)',
        ],
        base: [
          'var(--font-size-normal)',
          'var(--font-size-normal-line-height)',
        ],
      },
      borderRadius: {
        base: '20px',
      },
      dropShadow: {
        big: '-4px 4px 18px var(--color-shadow)',
        small: '-4px 4px 18px var(--color-shadow)',
        'properly-filled': '-4px 4px 18px var(--cta-secondary)',
      },
      colors: {
        'primary-color': 'var(--color-foreground-base)',
        'cta-primary': 'var(--cta-primary)',
        'cta-secondary': 'var(--cta-secondary)',
        'cta-secondary-opacity': 'var(--cta-secondary-opacity)',
        'gray-color': 'var(--color-gray)',
        error: 'var(--color-error)',
      },
      spacing: {
        'mobile-margin': '32px',
        'tablet-margin': '32px',
      },
      inset: {
        'mobile-for-absolute-margin': '32px',
        'tablet-for-absolute-margin': '32px',
      },
      zIndex: {
        60: '60',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              'font-size': 'var(--font-size-x-large)',
              'font-weight': 800,
              'line-height': 'var(--font-size-x-large-line-height)',
              color: 'var(--color-foreground-base)',
              'letter-spacing': '-1px',
            },
            h2: {
              'font-size': 'var(--font-size-x-large)',
              'font-weight': 400,
              'line-height': 'var(--font-size-x-large-line-height)',
              color: 'var(--color-foreground-base)',
              'letter-spacing': '-1px',
            },
            h3: {
              'font-size': 'var(--font-size-large)',
              'font-weight': 700,
              'line-height': 'var(--font-size-large-line-height)',
              color: 'var(--color-foreground-base)',
              'letter-spacing': '-1px',
            },
            h4: {
              'font-size': 'var(--font-size-normal)',
              'font-weight': 900,
              'line-height': 'var(--font-size-normal-line-height)',
              color: 'var(--color-foreground-base)',
              // 'letter-spacing': '1px',
            },
            b: {
              'font-size': 'var(--font-size-normal)',
              'font-weight': 600,
              'line-height': 'var(--font-size-normal-line-height)',
              color: 'var(--color-foreground-base)',
            },
            p: {
              'font-size': 'var(--font-size-normal)',
              'font-weight': 400,
              'line-height': 'var(--font-size-normal-line-height)',
              color: 'var(--color-foreground-base)',
            },
            ol: {
              'font-size': 'var(--font-size-normal)',
              'font-weight': 400,
              'line-height': 'var(--font-size-normal-line-height)',
              color: 'var(--color-foreground-base)',
            },
            ul: {
              'font-size': 'var(--font-size-normal)',
              'font-weight': 400,
              'line-height': 'var(--font-size-normal-line-height)',
              color: 'var(--color-foreground-base)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
