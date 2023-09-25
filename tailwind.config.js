/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: ['./assets/*.css', './*.html', './src/**/*.vue'],
    // ...
  },
  content: ['./public/**/*.html', './src/**/*.vue', './src/main.js'],
  theme: {
    extend: {
      colors: {
        'blue': {
          '300': '#1E9EAE',
          '500': '#198391',
          '700': '#1E9EAE',
          '800': '#156E7A'
        }
      }
    }
  },
  plugins: [],
}

