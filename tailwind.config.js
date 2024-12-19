const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./dev/slave.css",
    "./node_modules/flowbite-react/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#fff0f9',
          '100': '#ffe3f5',
          '200': '#ffc6eb',
          '300': '#ff98d9',
          '400': '#ff58be',
          '500': '#ff27a2',
          '600': '#ff017c',
          '700': '#df0060',
          '800': '#b8004f',
          '900': '#980345',
          '950': '#5f0025',
        },

      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

