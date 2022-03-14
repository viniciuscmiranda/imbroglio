import SupportQrCode from 'assets/images/support-qrcode.png';
import { PIX_KEY, PIX_URL } from 'constants';
import { useToast } from 'hooks';
import React from 'react';
import { FiCopy } from 'react-icons/fi';

import { Container, CopyButton, QrCode, Title } from './styles';

export const Support: React.FC = () => {
  const { toast } = useToast();

  return (
    <Container>
      <Title>{'Todo apoio é bem-vindo! :)'}</Title>

      <QrCode href={PIX_URL} target="_blank">
        <img src={SupportQrCode} alt="Apoiar" />
      </QrCode>

      <CopyButton
        aria-label="Copiar chave PIX"
        data-gtm="Copiar chave PIX"
        onClick={() => {
          navigator.clipboard.writeText(PIX_KEY).then(() => {
            toast('Copiado!', 'share');
          });
        }}
      >
        Copiar chave PIX
        <FiCopy />
      </CopyButton>
    </Container>
  );
};
