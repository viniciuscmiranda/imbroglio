import React, { useEffect, useRef, useState } from 'react';
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
  open?: boolean | null;
  title?: string;
  startOpen?: boolean | null;
  onOpen?: () => void;
  onClose?: () => void;
  trigger?: React.ReactElement;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  open: propsOpen,
  onOpen,
  onClose,
  startOpen,
  trigger,
}) => {
  const closeButtonRef = useRef<React.ElementRef<typeof Button>>(null);
  const contentRef = useRef<React.ElementRef<typeof Content>>(null);
  const triggerRef = useRef<React.ElementRef<typeof TriggerContainer>>(null);

  const [open, setOpen] = useState<boolean | null>(startOpen ? true : null);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') setOpen(false);
  }

  useEffect(() => {
    if (propsOpen === undefined) return;
    setOpen(propsOpen ? true : null);
  }, [propsOpen]);

  useEffect(() => {
    if (open === null) return;

    if (open) {
      contentRef.current?.addEventListener(
        'transitionend',
        () => closeButtonRef.current?.focus(),
        { once: true },
      );

      onOpen?.();
      window.addEventListener('keydown', onKeyDown);
    } else {
      (triggerRef.current?.childNodes[0] as any)?.focus();

      onClose?.();
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [open]);

  return (
    <>
      <TriggerContainer ref={triggerRef} onClick={() => setOpen(!open)}>
        {trigger}
      </TriggerContainer>

      <Overlay onClick={() => setOpen(false)} open={Boolean(propsOpen || open)} />

      <Container>
        <Content ref={contentRef} open={Boolean(propsOpen || open)}>
          <Header>
            <ModalTitle>{title}</ModalTitle>

            <Button
              ref={closeButtonRef}
              variant="ghost"
              aria-label="Fechar"
              onClick={() => setOpen(false)}
            >
              <FiX size="1.35rem" />
            </Button>
          </Header>

          <Scrollbars autoHide style={{ height: '35rem' }}>
            <Children tabIndex={open ? 0 : -1}>{children}</Children>
          </Scrollbars>
        </Content>
      </Container>
    </>
  );
};
