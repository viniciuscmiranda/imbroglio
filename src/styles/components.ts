import { styled } from 'styles';

export const Section = styled('div');

export const SectionTitle = styled('h3', {
  fontSize: '1.25em',
  marginBottom: '$1',
  display: 'block',
  color: '$text',

  '&::after': {
    content: '',
    display: 'block',
    height: '.15em',
    marginTop: '$0',
    width: '100%',
    borderRadius: '$1',
    backgroundColor: '$orange',
  },
});

export const Button = styled('button', {
  $$size: '3rem',
  width: '$$size',
  height: '$$size',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$$size',
  cursor: 'pointer',

  border: '.2rem solid $darkBlue',
  backgroundColor: '$blue',
  color: '$white',
  outlineColor: 'black',

  transition: 'transform .2s ease',
  '&:hover:not(:disabled)': {
    transform: 'scale(1.065)',
  },

  '*': {
    pointerEvents: 'none',
  },

  variants: {
    variant: {
      secondary: {
        borderColor: '$darkOrange',
        backgroundColor: '$orange',
        color: '$white',
      },

      ghost: {
        background: 'none',
        borderColor: '$text',
        color: '$text',
      },
    },
  },
});
