import { styled } from 'styles';

export const Container = styled('div', {
  position: 'absolute',
  inset: 0,
  padding: '$1',
  backgroundColor: '$white',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',

  transition: 'all .3s ease',
  transform: 'translateX(100%)',
  opacity: 0,
  visibility: 'hidden',
  pointerEvents: 'none',

  variants: {
    open: {
      true: {
        transform: 'translateX(0)',
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'all',
      },
    },
  },
});

export const TitleContainer = styled('div', {
  alignItems: 'center',
  display: 'flex',
  gap: '.75em',
  marginBottom: '$1',
  color: '$text',

  '& > p': {
    fontWeight: 'bold',
    fontSize: '1.5em',
  },
});

export const CloseButton = styled('button', {
  border: 'none',
  background: 'none',
  color: '$text',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  width: '1.5em',
  height: '1.5em',
  borderRadius: '50%',

  transition: 'transform .15s ease',

  '&:hover, &:focus': {
    transform: 'scale(1.2)',
  },
});

export const TriggerContainer = styled('span');

export const Children = styled('div', {
  color: '$text',
  paddingBottom: '$1',
  flex: 1,
});
