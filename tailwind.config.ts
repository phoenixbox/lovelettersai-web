import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [typography],
}
