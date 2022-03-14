import { styled } from 'styles';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

export const Social = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  '& > div > strong': {
    display: 'block',
    marginBottom: '.25rem',
  },
});

export const SocialContainer = styled('div', {
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap',
  gap: '.75rem',
});

export const SocialButton = styled('a', {
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
    textDecoration: 'underline',
    transform: 'scale(1.05)',
  },

  '*': {
    pointerEvents: 'none',
  },

  variants: {
    variant: {
      github: {
        backgroundColor: '#161b22',
        borderColor: '#000000',
      },
      twitter: {
        backgroundColor: '#1d9bf0',
        borderColor: '#168dde',
      },
      twitch: {
        backgroundColor: '#6441a5',
        borderColor: '#593a92',
      },
      notion: {
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#000',
      },
      letterjumble: {
        backgroundColor: '#4CAF50',
        borderColor: '#37913a',
      },
      termo: {
        backgroundColor: '#504a4b',
        borderColor: '#312a2c',
      },
    },
  },
});
