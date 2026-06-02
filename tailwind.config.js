/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/ui-lib/src/**/*.{html,ts}",
    "./projects/demo-app/src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
      portal: '#97ce4c',
      portalDark: '#6aad1a',
      space: '#11181d',
      spaceLight: '#1f2937',
      danger: '#f4442e',
      dangerDark: '#c1121f'
      }
    },
    fontFamily: {
      orbitron: ['Orbitron', 'sans-serif'],
      exo: ['Exo 2', 'sans-serif']
    }
  },
  plugins: [],
}

