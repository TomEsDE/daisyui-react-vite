function withOpacity(clrVar) {
  return ({ opacityValue }) => `rgba(var(${clrVar}), ${opacityValue ?? 1})`;
}

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
          inverted: 'var(--color-text-inverted)',
        },
      },
      backgroundColor: {
        skin: {
          // fill: ({ opacityValue }) =>
          //   `rgba(var(--color-fill), ${opacityValue ?? 1})`,
          fill: withOpacity('--color-fill'),
          'button-accent': 'var(--color-button-accent)',
          'button-accent-hover': 'var(--color-button-accent-hover)',
          'button-muted': 'var(--color-button-muted)',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      screens: {
        // 'mobile': '640px',
        tablet: '960px',
        desktop: '1280px',
      },
    },
  },
};

// colors: {
//   'text-base': 'var(--color-text-base)',
//   'text-muted': 'var(--color-text-muted)',
//   'text-inverted': 'var(--color-text-inverted)',
//   'color-fill': 'var(--color-fill)',
//   'button-accent': 'var(--color-button-accent)',
//   'button-accent-hover': 'var(--color-button-accent-hover)',
//   'button-muted': 'var(--color-button-muted)',
//   white: '#ffffff',
//   purple: '#3f3cbb',
//   midnight: '#121063',
//   metal: '#565584',
//   'tahiti-blue': '#3ab7bf',
//   'cool-white': '#ecebff',
//   'bubble-gum': '#ff77e9',
//   'copper-rust': '#78dcca',
// },
