import { styled } from 'styles';
import { Button } from 'styles/components';

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

export const Points = styled(Button, {
  fontWeight: 'bold',
  width: 'auto',
  gap: '$0',
  fontSize: '1.15rem',
  padding: '0 1rem',
});
