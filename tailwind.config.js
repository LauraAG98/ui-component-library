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
      space: '#0a0e1a',
      spaceLight: '#11181d',
      danger: '#f4442e',
      dangerDark: '#c1121f',
      rick: '#75b2dd',
      morty: '#f9d923'
      },
      fontFamily: {
      orbitron: ['Orbitron', 'sans-serif'],
      exo: ['Exo 2', 'sans-serif']
    }
    },
  },
  plugins: [],
}