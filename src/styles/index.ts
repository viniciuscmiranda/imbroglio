import { createStitches } from '@stitches/react';
import { LETTERS_PER_ROW } from 'contants';

// configurações de estilo (css)
export const { globalCss, styled } = createStitches({
  theme: {
    colors: {
      pink: '#D741A7',
      purple: '#3A1772',
      blue: '#5398BE',
      darkBlue: '#3a7b9e',
      darkerBlue: '#143a4f',
      yellow: '#F2CD5D',
      orange: '#DEA54B',
      green: '#169873',
      darkGreen: '#0c7d5d',
      white: '#fff',
      gray: '#aaa',
      lightGray: '#e5e5e5',
      lighterGray: '#f1f1f1',

      stroke: '$lightGray',
      background: '$yellow',

      text: '#000',
      textLight: '#fff',
    },

    fontSizes: {
      small: '.7rem',
      normal: '1rem',
      large: '1.5rem',
      larger: '2rem',
    },

    sizes: {
      letterSize: '4rem',
      letterSpacing: '.5rem',
      rowWidth: `calc(($letterSize * ${LETTERS_PER_ROW}) + ($letterSpacing * ${
        LETTERS_PER_ROW + 2
      }))`,
    },

    space: {
      0: '.5rem',
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
    fontSize: '18px',
    fontFamily: "'Quicksand', sans-serif",
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
