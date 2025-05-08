/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '30rem',
      },
      colors: {
        lightorange: {
          lightest: '#ffd29c',
          lighter: '#ffcf94',
          DEFAULT: '#ffcb8a',
          darker: '#edb774',
          darkest: '#dea764',
        },
        lightblue: {
          lightest: '#5cd4ff',
          lighter: '#4dd0ff',
          DEFAULT: '#34c9ff',
          darker: '#29bdf2',
          darkest: '#1ea7d9',
        },
        lightgreen: {
          lightest: '#C3D3C1',
          lighter: '#BFCFBB',
          DEFAULT: '#B2CAB6',
        },
        raisinblack: {
          lighter: '#383846',
          DEFAULT: '#2E2E3A',
          darker: '#24242E',
        },
        deepblack: {
          DEFAULT: '#232324',
        },
      }, 
    },
  },
  plugins: [],
}

