/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#ff3c00',
        blue: '#132efe',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        marker: ['"Patrick Hand"', 'cursive'],
        permanent: ['"Permanent Marker"', 'cursive'],
        caveat: ['"Caveat"', 'cursive'],
        architects: ['"Architects Daughter"', 'cursive'],
      },
    },
  },
  plugins: [],
}
