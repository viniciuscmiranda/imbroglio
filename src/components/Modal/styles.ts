import { styled } from 'styles';

export const TriggerContainer = styled('span');

export const Overlay = styled('div', {
  position: 'fixed',
  inset: 0,
  backgroundColor: '$overlay',

  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity .2s ease',
  zIndex: '$modal',

  variants: {
    open: {
      true: {
        opacity: 1,
        pointerEvents: 'all',
      },
    },
  },
});

export const Container = styled('div', {
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '$modal',
});

export const Content = styled('div', {
  '--header-height': '5rem',

  backgroundColor: '$white',
  width: '40rem',
  borderRadius: '$1',
  border: '.2rem solid $text',

  pointerEvents: 'none',
  opacity: 0,
  transition: 'all .3s ease',
  transform: 'translateY(30%) scale(.4)',
  visibility: 'hidden',

  '@media (max-width: 800px)': {
    width: 'calc(100% - 3rem)',
    '*': { fontSize: '1.3rem' },
  },

  variants: {
    open: {
      true: {
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'all',
        transform: 'translateY(0) scale(1)',
      },
    },
  },
});

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 $1',
  height: 'var(--header-height)',
});

export const ModalTitle = styled('h2', {
  color: '$text',
  fontSize: '$large',
  fontWeight: 'bold',
});

export const Children = styled('div', {
  padding: '$1',
  overflow: 'hidden',
});
