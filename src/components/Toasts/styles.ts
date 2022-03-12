import { keyframes, styled } from 'styles';

export const Container = styled('div', {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  pointerEvents: 'none',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',

  gap: '$0',
  padding: '$0',
});

const toastEnter = keyframes({
  '0%': {
    opacity: '0',
    transform: 'scale(.6)',
    height: '0',
  },

  '60%': {
    opacity: '.3',
  },

  '100%': {
    opacity: '1',
    transform: 'scale(1)',
    height: '4rem',
  },
});

const toastExit = keyframes({
  '0%': {
    opacity: '1',
    transform: 'scale(1)',
    height: '4rem',
  },

  '100%': {
    opacity: '0',
    transform: 'scale(.6)',
    height: '0',
  },
});

export const Toast = styled('div', {
  width: '15rem',
  height: '4rem',
  border: '.2rem solid $darkGreen',
  backgroundColor: '$green',
  color: '$white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$0',
  borderRadius: '$1',
  animation: `${toastEnter} .2s ease`,

  '& > p': {
    fontWeight: 'bold',
  },

  variants: {
    exiting: {
      true: {
        animation: `${toastExit} .2s ease`,
        opacity: '0',
        transform: 'scale(.6)',
        height: '0',
      },
    },
  },
});
