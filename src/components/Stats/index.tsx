import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

import { Container } from './styles';

export const Stats: React.FC = () => {
  return (
    <Container>
      <FiAlertTriangle size="2.5rem" />
      <div>
        {'Estamos em obras ;)'}
        <span>Volte mais tarde...</span>
      </div>
    </Container>
  );
};
