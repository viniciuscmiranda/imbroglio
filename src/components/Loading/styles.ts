import { styled } from 'styles';

export const Container = styled('div', {
  '--spinner-color': '$colors$darkOrange',

  widht: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '1rem',
  color: '$darkOrange',
  fontWeight: 'bold',
  fontSize: '1.25rem',
});
