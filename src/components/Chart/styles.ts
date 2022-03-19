import bg from 'assets/images/bg.png';
import { styled } from 'styles';

export const Container = styled('div', {
  border: '.2em solid $darkOrange',
  backgroundColor: '$background',
  backgroundImage: `url(${bg})`,
  backgroundBlendMode: 'multiply',
  backgroundSize: '20rem',
  borderRadius: '$1',
});

export const ChartContainer = styled('div', {
  display: 'flex',
  gap: '$0',
  padding: '$1',
  height: '100%',
  overflow: 'hidden',
});

export const BarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'flex-end',
  gap: '.25em',
  alignItems: 'center',

  '&:last-of-type': {
    paddingRight: '.75rem',
  },

  '> span': {
    fontWeight: 'bold',
    fontSize: '.8em',
  },
});

export const Bar = styled('div', {
  backgroundColor: '$blue',
  borderRadius: '$1',
  border: '.2em solid $darkBlue',
  height: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  padding: '$0',
  minWidth: 'max-content',
  minHeight: '2.55em',
  overflow: 'hidden',

  '& > span': {
    color: '$white',
    writingMode: 'vertical-lr',
    transform: 'rotate(180deg)',
    height: '100%',
    whiteSpace: 'nowrap',
  },

  variants: {
    green: {
      true: {
        backgroundColor: '$green',
        borderColor: '$darkGreen',
      },
    },
  },
});

export const Placeholder = styled('p', {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '1.25em',
  textAlign: 'center',
});
