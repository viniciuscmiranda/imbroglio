import { styled } from 'styles';

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  backgroundColor: '$blue',
  borderRadius: '$1',
  padding: '.25rem .5rem',
  border: '.2rem solid $darkBlue',
  marginBottom: '1rem',

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
