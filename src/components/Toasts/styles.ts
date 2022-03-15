import { keyframes, styled } from 'styles';

export const Container = styled('div', {
  position: 'absolute',
  display: 'flex',
  pointerEvents: 'none',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  inset: 0,
  gap: '$0',
  padding: '$0',
  transform: 'translateY(1rem)',
  zIndex: '$toast',
});

const toastEnter = keyframes({
  '0%': {
    opacity: '0',
    transform: 'scale(.6)',
  },

  '60%': {
    opacity: '.3',
  },

  '100%': {
    opacity: '1',
    transform: 'scale(1)',
  },
});

const toastExit = keyframes({
  '0%': {
    opacity: '1',
    transform: 'scale(1)',
  },

  '100%': {
    opacity: '0',
    transform: 'scale(.6)',
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
  transformOrigin: '50% 50%',

  animation: `${toastEnter} .15s ease`,

  '& > p': {
    fontWeight: 'bold',
  },

  variants: {
    exiting: {
      true: {
        animation: `${toastExit} .15s ease`,
        transform: 'scale(.6)',
        opacity: '0',
      },
    },
  },
});
