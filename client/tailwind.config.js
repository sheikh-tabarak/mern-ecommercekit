// /** @type {import('tailwindcss').Config} */
module.exports = {
 

  content: [
    "./index.html" , 
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
    // "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [

    require('flowbite/plugin')
  ],
}
