import { styled } from 'styles';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const Header = styled('div', {
  marginBottom: '$1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$1',
  backgroundColor: '$green',
  border: '.2rem solid $darkGreen',
  color: '$white',
  borderRadius: '$1',
  gap: '$1',

  '@media (max-width: 800px)': {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});

export const HeaderMessageTitle = styled('span', {
  fontWeight: 'bold',
  fontSize: '1.25em',
});

export const CardsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(17em, 1fr))',
  gap: '$1',
  color: '$blue',
  marginBottom: '$2',
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
  width: '100%',
  textAlign: 'left',

  variants: {
    hasPage: {
      true: {
        cursor: 'pointer',
        backgroundColor: '$green',
        borderColor: '$darkGreen',

        transition: 'transform .15s ease',

        '&:hover, &:focus': {
          transform: 'scale(1.035)',
        },
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

export const ActionButton = styled('div', {
  color: '$white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.5em',
  height: '1.5em',
  borderRadius: '50%',
});

export const TableContainer = styled('div', {
  width: '100%',
  borderRadius: '$1',
  border: '.2rem solid $darkGreen',
  backgroundColor: '$green',
  color: '$white',
  height: '100%',

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
