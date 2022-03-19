import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
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

export type ModalProps = {
  open?: boolean | null;
  title?: string;
  startOpen?: boolean | null;
  onOpen?: () => void;
  onClose?: () => void;
  trigger?: React.ReactElement;
};

export type ModalContextProps = ModalProps & {
  setHideChildrenOverflow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext({} as ModalContextProps);

export const useModal = () => useContext(ModalContext);

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
  const [render, setRender] = useState(false);

  const [hideChildrenOverflow, setHideChildrenOverflow] = useState(false);

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
        'animationend',
        () => closeButtonRef.current?.focus(),
        { once: true },
      );

      onOpen?.();
      setRender(true);
      window.addEventListener('keydown', onKeyDown);
    } else {
      contentRef.current?.addEventListener('animationend', () => setRender(false), {
        once: true,
      });

      (triggerRef.current?.childNodes[0] as any)?.focus();

      onClose?.();
      setHideChildrenOverflow(false);
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [open]);

  return (
    <ModalContext.Provider
      value={{
        title,
        open,
        onOpen,
        onClose,
        startOpen,
        trigger,
        setHideChildrenOverflow,
      }}
    >
      <TriggerContainer ref={triggerRef} onClick={() => setOpen(!open)}>
        {trigger}
      </TriggerContainer>
      {render && (
        <>
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

              <Scrollbars
                autoHide
                style={{ height: '37.5rem' }}
                renderTrackHorizontal={() => <div style={{ display: 'none' }} />}
                renderThumbHorizontal={() => <div style={{ display: 'none' }} />}
                renderView={(props) => (
                  <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
                )}
              >
                <Children overflowHidden={hideChildrenOverflow} tabIndex={open ? 0 : -1}>
                  {children}
                </Children>
              </Scrollbars>
            </Content>
          </Container>
        </>
      )}
    </ModalContext.Provider>
  );
};
