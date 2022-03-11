import { styled } from 'styles';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

export const List = styled('ul', {
  listStyle: 'none',

  '& > li': {
    display: 'flex',
    alignItems: 'center',
    gap: '$0',
    color: '$darkOrange',
    fontWeight: 'bold',

    '&:not(:last-child)': {
      marginBottom: '$1',
    },
  },
});

export const Image = styled('figure', {
  width: '18rem',
  height: '9rem',
  borderRadius: '$1',
  overflow: 'hidden',
  marginBottom: '$1',

  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});
