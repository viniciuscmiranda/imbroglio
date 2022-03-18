import { styled } from 'styles';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

export const CardsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(15em, 1fr))',
  gap: '$1',
  color: '$blue',
});

export const Card = styled('div', {
  border: '.2em solid $darkBlue',
  borderRadius: '$1',
  padding: '$1',
  backgroundColor: '$blue',
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
  justifyContent: 'space-between',

  variants: {
    hasPage: {
      true: {
        backgroundColor: '$green',
        borderColor: '$darkGreen',
      },
    },
  },
});

export const StatContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
  color: '$white',
});

export const InfoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',

  '& > p': {},

  '& > span': {
    fontWeight: 'bold',
    fontSize: '1.25em',
  },
});

export const IconContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const ActionButton = styled('button', {
  all: 'unset',
  color: '$white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  width: '1.5em',
  height: '1.5em',

  transition: 'transform .15s ease',

  '&:hover, &:focus': {
    transform: 'scale(1.2)',
  },
});

export const TableContainer = styled('div', {
  width: '100%',
  borderRadius: '$1',
  border: '.2rem solid $darkGreen',
  backgroundColor: '$green',
  color: '$white',

  '& table': {
    borderCollapse: 'collapse',
    width: '100%',

    '& th': {
      position: 'sticky',
      top: '0',
      backgroundColor: '$darkGreen',
    },

    '& td': {},

    '& td, & th': {
      textAlign: 'center',
      padding: '$0',
      borderBottom: '1px solid $darkGreen',
    },
  },
});
