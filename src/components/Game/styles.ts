import { BENCH_ROW_LENGTH, MAX_LETTERS, ROWS_AMOUNT } from 'constants';
import { styled } from 'styles';

export const GameContainer = styled('div', {
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1em',
});

export const Board = styled('div', {
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

export const Row = styled('div', {
  display: 'flex',
  padding: '$0',
  paddingLeft: '0',
  flex: '1',
  overflow: 'hidden',
  position: 'relative',

  variants: {
    selected: {
      true: {
        backgroundColor: '$lightGray',
      },
    },
  },
});

export const Letter = styled('span', {
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

export const Bench = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: `calc(${BENCH_ROW_LENGTH} * $letterSize + ($letterSpacing * ${
    BENCH_ROW_LENGTH + 6
  }))`,
  height: `calc(${MAX_LETTERS / BENCH_ROW_LENGTH} * $letterSize + ($letterSpacing * ${
    MAX_LETTERS / BENCH_ROW_LENGTH - 1
  }))`,
});

export const BenchRow = styled('div', {
  display: 'flex',
  marginBottom: '$0',

  '&:first-child': {
    height: '$letterSize',
  },

  '&:nth-last-child(2)': {
    height: '100%',
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
