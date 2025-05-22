/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5C0A0A',
        'primary-dark': '#4A0808',
        neutral: require('tailwindcss/colors').neutral,
        background: '#FAFAF8',
        ring: '#5C0A0A',
        input: 'rgb(229 231 235)',
        'primary-foreground': '#FFFFFF',
        'muted-foreground': 'rgb(107 114 128)',
        accent: 'rgb(243 244 246)'
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
