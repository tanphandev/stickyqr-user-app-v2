const colors = require('./src/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
      },
      spacing: {
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
      },
      colors: {
        ...colors,
        primary: 'var(--primary)',
        'red-d33': 'var(--red-d33)',
        'red-ff0': 'var(--red-ff0)',
        'red-ff4': 'var(--red-ff4)',
        'gray-ebe': 'var(--gray-ebe)',
        'blue-344': 'var(--blue-344)',
      },
    },
  },
  plugins: [],
};
