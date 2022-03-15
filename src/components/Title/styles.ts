import { styled } from 'styles';

export const Container = styled('div', {
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  backgroundColor: '$blue',
  borderRadius: '$1',
  padding: '.5rem 1rem',
  paddingLeft: '.75rem',
  border: '.2rem solid $darkBlue',

  '& > img': {
    width: '2rem',
    height: '2rem',
  },
});

export const GameTitle = styled('h1', {
  fontWeight: 'bold',
  fontSize: '2.35rem',
  color: '$white',
});
