/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'dota-assasin': '#bfc971',
      'dota-demonhunter': '#6c138f',
      'dota-druid': '#cc6606',
      'dota-hunter': '#99bf6b',
      'dota-knight': '#ed8ab8',
      'dota-mage': '#79c3db',
      'dota-mech': '#c27706',
      'dota-shaman': '#2b43a1',
      'dota-warlock': '#574a8a',
      'dota-warrior': '#b89065',
      'dota-beast': '#2b8016',
      'dota-demon': '#771cbd',
      'dota-dwarf': '#a37056',
      'dota-dragon': '#cc040b',
      'dota-elemental': '#fcf80a',
      'dota-elf': '#0d578c',
      'dota-goblin': '#a82814',
      'dota-human': '#ffffff',
      'dota-naga': '#4d46d4',
      'dota-ogre': '#00455c',
      'dota-orc': '#8c1527',
      'dota-troll': '#757861',
      'dota-undead': '#575757',
      'dota-satyr': 'navy',
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
  safelist: [
    {
      pattern: /(bg|text|border)-dota-.*/,
    },
  ],
};
