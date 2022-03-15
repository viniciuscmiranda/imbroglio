import { styled } from 'styles';

export const Section = styled('div');

export const SectionTitle = styled('h3', {
  fontSize: '1.25em',
  marginBottom: '.75em',
  display: 'block',
  color: '$text',

  '&::after': {
    content: '',
    display: 'block',
    height: '.2rem',
    marginTop: '$0',
    width: '100%',
    borderRadius: '$1',
    backgroundColor: '$text',
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

  '&:disabled': {
    cursor: 'not-allowed',
    backgroundColor: '$gray',
    borderColor: '$darkGray',
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
