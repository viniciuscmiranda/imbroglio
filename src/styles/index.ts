import { createStitches } from '@stitches/react';
import { LETTERS_PER_ROW } from 'constants';

// configurações de estilo (css)
export const { globalCss, styled, keyframes } = createStitches({
  theme: {
    colors: {
      blue: '#3177ad',
      darkBlue: '#24689c',
      yellow: '#F2CD5D',
      orange: '#cc963f',
      darkOrange: '#b5812f',
      text: '$orange',
      green: '#169873',
      darkGreen: '#0c7d5d',
      white: '#fff',
      gray: '#aaa',
      darkGray: '#888',
      overlay: 'rgba(0,0,0,.3)',
      stroke: '#e5e5e5',
      background: '$yellow',
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

    zIndices: {
      toast: 11,
      modal: 10,
    },
  },
});

// estilo global
export const global = globalCss({
  '*': {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    fontSize: '15px',
    fontFamily: "'Quicksand', sans-serif",

    '@media (max-width: 1380px)': {
      fontSize: '14px',
    },

    '@media (max-width: 920px)': {
      fontSize: '16px',
    },

    '@media (max-width: 640px)': {
      fontSize: '14px',
    },

    '@media (max-width: 500px)': {
      fontSize: '10px',
    },

    '@media (max-width: 370px)': {
      fontSize: '9px',
    },
  },

  '#root': {
    height: '100vh',
    width: '100vw',
  },

  body: {
    backgroundColor: '$background',
    color: '$text',
    backgroundImage: `url(${bg})`,
    backgroundSize: '20rem',
    fontSize: '$normal',
  },
});

import bg from 'assets/images/bg.png';
