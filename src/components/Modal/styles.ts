import { keyframes, styled } from 'styles';

export const TriggerContainer = styled('span');

const overlayEnter = keyframes({
  from: {
    opacity: 0,
  },

  to: {
    opacity: 1,
  },
});

const overlayExit = keyframes({
  from: {
    opacity: 1,
  },

  to: {
    opacity: 0,
  },
});

export const Overlay = styled('div', {
  inset: 0,
  position: 'fixed',
  backgroundColor: '$overlay',
  zIndex: '$modal',

  variants: {
    open: {
      true: {
        animation: `${overlayEnter} .2s ease`,
      },

      false: {
        animation: `${overlayExit} .2s ease`,
        opacity: 0,
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

const contentEnter = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(30%) scale(.4)',
  },

  to: {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },
});

const contentExit = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },

  to: {
    opacity: 0,
    transform: 'translateY(30%) scale(.4)',
  },
});

export const Content = styled('div', {
  '--header-height': '5rem',

  backgroundColor: '$white',
  overflow: 'hidden',
  width: '40rem',
  borderRadius: '$1',
  border: '.2rem solid $text',

  opacity: 1,
  visibility: 'visible',
  pointerEvents: 'all',
  transform: 'translateY(0) scale(1)',

  '@media (max-width: 800px)': {
    width: 'calc(100% - 3rem)',
    '*': { fontSize: '1.3rem' },
  },

  variants: {
    open: {
      true: {
        animation: `${contentEnter} .3s ease`,
      },

      false: {
        opacity: 0,
        animation: `${contentExit} .3s ease`,
        transform: 'translateY(30%) scale(.4)',
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
  paddingBottom: '$2',
  overflowX: 'hidden',

  variants: {
    overflowHidden: {
      true: {
        height: '100%',
        overflow: 'hidden',
      },
    },
  },
});
