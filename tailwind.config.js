/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background)/ <alpha-value>)",
        content: "rgb(var(--color-content)/ <alpha-value>)",
        borderColor: "rgb(var(--color-borderColor)/ <alpha-value>)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  prefix: 'mk-'
}

