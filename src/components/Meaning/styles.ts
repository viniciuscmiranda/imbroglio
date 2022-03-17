import { styled } from 'styles';

export const Button = styled('button', {
  color: '$darkOrange',
  border: '.2rem solid $darkOrange',
  backgroundColor: '$white',
  position: 'absolute',
  top: '.25rem',
  left: '.25rem',
  borderRadius: '50%',
  height: '2rem',
  width: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: '$meaning',

  transition: 'transform .2s ease',

  '&:hover': {
    transform: 'scale(1.1)',
  },
});

export const Content = styled('div', {
  listStylePosition: 'inside',
  display: 'flex',
  flexDirection: 'column',
  gap: '$0',

  '& > li': {},
});
