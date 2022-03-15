import { styled } from 'styles';

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '$2',
});

export const Title = styled('p', {
  fontWeight: 'bold',
  color: '$orange',
  fontSize: '$large',
  marginBottom: '$1',
});

export const QrCode = styled('a', {
  display: 'block',
  width: '16rem',
  borderRadius: '$1',
  overflow: 'hidden',
  border: '.2rem solid $orange',
  padding: '.5rem',
  transition: 'transform .2s ease',

  '&:hover': {
    transform: 'scale(1.05)',
  },

  '> img': {
    width: '100%',
    pointerEvents: 'none',
  },
});

export const CopyButton = styled('button', {
  display: 'flex',
  gap: '$0',
  width: 'max-content',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$white',
  backgroundColor: '$orange',
  borderRadius: '2rem',
  padding: '$0 $1',
  cursor: 'pointer',
  textDecoration: 'none',
  border: '.2rem solid $darkOrange',

  transition: 'transform .2s ease',

  '&:hover': {
    transform: 'scale(1.05)',
  },

  '*': {
    pointerEvents: 'none',
  },
});
