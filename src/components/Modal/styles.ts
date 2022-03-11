import { styled } from 'styles';

export const TriggerContainer = styled('span');

export const Overlay = styled('div', {
  position: 'fixed',
  inset: 0,
  backgroundColor: '$overlay',

  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity .2s ease',

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
});

export const Content = styled('div', {
  '--header-height': '5rem',
  '--max-height': 'calc(80vh - var(--header-height))',

  backgroundColor: '$white',
  width: '40rem',
  borderRadius: '$1',
  border: '.2rem solid $orange',

  pointerEvents: 'none',
  opacity: 0,
  transition: 'all .3s ease',
  transform: 'translateY(30%) scale(.4)',
  visibility: 'hidden',

  '@media (max-width: 40rem)': {
    width: 'calc(100% - 3rem)',
    maxHeight: 'calc(100% - 3rem)',
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
  marginBottom: '$1',
  padding: '0 $1',
  height: 'var(--header-height)',
});

export const ModalTitle = styled('h2', {
  color: '$orange',
  fontSize: '$large',
  fontWeight: 'bold',
});

export const Children = styled('div', {
  padding: '0 $1',
  paddingBottom: '$1',
  overflow: 'hidden',
});
