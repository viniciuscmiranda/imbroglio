import React from 'react';
import { GooSpinner } from 'react-spinners-kit';

import { Container } from './styles';

type LoadingProps = {
  error?: boolean;
};

export const Loading: React.FC<LoadingProps> = ({ error }) => {
  return (
    <Container>
      {!error ? (
        <>
          <GooSpinner size={56} color="var(--spinner-color)" />
          Carregando
        </>
      ) : (
        <>{'Algo deu errado :('}</>
      )}
    </Container>
  );
};
