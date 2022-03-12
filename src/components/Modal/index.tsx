import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FiX } from 'react-icons/fi';
import { Button } from 'styles/components';

import {
  Children,
  Container,
  Content,
  Header,
  ModalTitle,
  Overlay,
  TriggerContainer,
} from './styles';

type ModalProps = {
  open?: boolean;
  title?: string;
  onOpen?: () => void;
  onClose?: () => void;
  trigger: React.ReactElement;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  open: propsOpen,
  onOpen,
  onClose,
  trigger,
}) => {
  const [open, setOpen] = useState<ModalProps['open']>();

  useEffect(() => {
    setOpen(propsOpen);
  }, [propsOpen]);

  useEffect(() => {
    if (open === undefined) return;
    if (open) onOpen?.();
    else onClose?.();
  }, [open]);

  return (
    <>
      <TriggerContainer onClick={() => setOpen(!open)}>{trigger}</TriggerContainer>

      <Overlay onClick={() => setOpen(false)} open={open} />

      <Container>
        <Content open={open}>
          <Header>
            <ModalTitle>{title}</ModalTitle>

            <Button variant="ghost" onClick={() => setOpen(false)}>
              <FiX size="1.35rem" />
            </Button>
          </Header>

          <Scrollbars autoHide style={{ height: 'var(--max-height)' }}>
            <Children>{children}</Children>
          </Scrollbars>
        </Content>
      </Container>
    </>
  );
};