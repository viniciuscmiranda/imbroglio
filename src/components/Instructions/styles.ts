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
    color: '$text',
    fontWeight: 'bold',

    '&:not(:last-child)': {
      marginBottom: '$1',
    },
  },
});

export const Image = styled('figure', {
  borderRadius: '$1',
  overflow: 'hidden',
  backgroundColor: '$background',
  border: '.2rem solid $text',

  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});
