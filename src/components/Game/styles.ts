import { MAX_LETTERS, ROWS_AMOUNT, UNUSED_ROW_LENGTH } from 'constants';
import { styled } from 'styles';

export const GameContainer = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  gap: '1em',
});

export const RowsContainer = styled('div', {
  backgroundColor: '$white',
  borderRadius: '$1',
  overflow: 'hidden',
  width: '$rowWidth',
  border: '.2rem solid $orange',
  minHeight: `calc((($letterSize + ($letterSpacing * 2.5)) * ${ROWS_AMOUNT}))`,
  display: 'flex',
  flexDirection: 'column',

  '>*:not(:last-child)': {
    borderBottom: '1px solid $stroke',
  },
});

export const RowContainer = styled('div', {
  display: 'flex',
  padding: '$0',
  paddingLeft: '0',
  flex: '1',
  overflow: 'hidden',
});

export const LetterContainer = styled('span', {
  backgroundColor: '$blue',
  height: '$letterSize',
  width: '$letterSize',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  fontSize: '$large',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  color: '$white',
  cursor: 'pointer',
  border: '.2rem solid $darkBlue',
  marginLeft: '$0',

  '&:hover': {
    opacity: 0.85,
  },

  '&:focus': {
    outline: 'none',
    borderColor: 'black',
  },

  variants: {
    correct: {
      true: {
        backgroundColor: '$green',
        borderColor: '$darkGreen',
      },
    },
  },
});

export const BenchContainer = styled('div', {
  minWidth: `calc(${UNUSED_ROW_LENGTH} * $letterSize + ($letterSpacing * ${
    UNUSED_ROW_LENGTH + 1
  }))`,
  height: `calc(${MAX_LETTERS / UNUSED_ROW_LENGTH} * $letterSize + ($letterSpacing * ${
    MAX_LETTERS / UNUSED_ROW_LENGTH - 1
  }))`,
});

export const BenchLettersContainer = styled('div', {
  display: 'flex',
  marginBottom: '$0',

  '&:first-child': {
    height: '$letterSize',
  },

  variants: {
    disabled: {
      true: {
        '&:not(:first-child)': {
          display: 'none',
        },
      },
    },
  },
});

export const LastSolution = styled('p', {
  textAlign: 'center',
  color: '$darkOrange',
  fontWeight: 'bold',
});
