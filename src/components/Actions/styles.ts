import { styled } from 'styles';

export const Container = styled('div', {
  justifyContent: 'space-between',
  width: '$rowWidth',
  padding: '0 .5rem',
  marginBottom: '-.25rem',

  '&, & > div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$0',
  },
});

export const Points = styled('p', {
  fontWeight: 'bold',
  color: '$darkBlue',
});
