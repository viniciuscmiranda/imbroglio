import { useToast } from 'hooks';
import React from 'react';

import { Container, Toast } from './styles';

export const Toasts: React.FC = () => {
  const { toasts, exitingToasts } = useToast();

  return (
    <Container>
      {toasts.map((toast) => (
        <Toast exiting={exitingToasts.includes(toast.id)} key={toast.id}>
          {toast.content && <p>{toast.content}</p>}
        </Toast>
      ))}
    </Container>
  );
};
