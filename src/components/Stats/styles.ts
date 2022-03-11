import { styled } from 'styles';

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '25rem',
  flexDirection: 'column',
  color: '$orange',
  gap: '$0',

  '& > div': {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textAlign: 'center',

    '& >  span': {
      display: 'block',
      fontWeight: 'normal',
      fontSize: '1rem',
    },
  },
});
