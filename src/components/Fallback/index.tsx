import React from 'react';
import { GooSpinner } from 'react-spinners-kit';

import { Container } from './styles';

type LoadingProps = React.ComponentProps<typeof Container> & {
  error?: boolean;
  errorMessage?: string;
};

export const Fallback: React.FC<LoadingProps> = ({
  error,
  errorMessage = 'Erro de conexão :(',
  ...props
}) => {
  return (
    <Container {...props}>
      {!error ? (
        <>
          <GooSpinner size={56} color="var(--spinner-color)" />
          Carregando
        </>
      ) : (
        <>{errorMessage}</>
      )}
    </Container>
  );
};
