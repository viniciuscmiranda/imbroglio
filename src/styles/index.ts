import { createStitches } from '@stitches/react';
import { LETTERS_PER_ROW } from 'constants';

// configurações de estilo (css)
export const { globalCss, styled, keyframes } = createStitches({
  theme: {
    colors: {
      blue: '#3B88C3',
      darkBlue: '#2a72a8',
      darkerBlue: '#195785',
      yellow: '#F2CD5D',
      orange: '#DEA54B',
      darkOrange: '#cc943d',
      green: '#169873',
      darkGreen: '#0c7d5d',
      white: '#fff',
      gray: '#aaa',
      darkGray: '#888',
      lightGray: '#e5e5e5',
      lighterGray: '#f1f1f1',
      overlay: 'rgba(0,0,0,.3)',

      stroke: '$lightGray',
      background: '$yellow',

      text: '#000',
      textLight: '#fff',
    },

    fontSizes: {
      small: '.7em',
      normal: '1em',
      large: '1.5em',
      larger: '2em',
    },

    sizes: {
      letterSize: '4rem',
      letterSpacing: '.5rem',
      rowWidth: `calc(($sizes$letterSize * ${LETTERS_PER_ROW}) + ($sizes$letterSpacing * ${
        LETTERS_PER_ROW + 6
      }))`,
    },

    space: {
      0: '.5em',
      1: '1em',
      2: '2em',
    },

    radii: {
      1: '.5rem',
    },
  },
});

// estilo global
export const global = globalCss({
  '*': {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    fontSize: '16px',
    fontFamily: "'Quicksand', sans-serif",

    '@media (max-width: 640px)': {
      fontSize: '10px',
    },

    '@media (max-width: 400px)': {
      fontSize: '9px',
    },

    '@media (max-width: 300px)': {
      fontSize: '7px',
    },
  },

  '#root': {
    height: '100vh',
    width: '100vw',
  },

  body: {
    backgroundColor: '$background',
    color: '$text',
    fontSize: '$normal',
  },
});
