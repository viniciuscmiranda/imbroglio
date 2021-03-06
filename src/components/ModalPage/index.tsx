import { useModal } from 'components/Modal';
import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import {
  Children,
  CloseButton,
  Container,
  TitleContainer,
  TriggerContainer,
} from './styles';

type ModalPageProps = {
  open?: boolean | null;
  title?: string;
  startOpen?: boolean | null;
  onOpen?: () => void;
  onClose?: () => void;
  trigger?: React.ReactElement;
};

export const ModalPage: React.FC<ModalPageProps> = ({
  children,
  title,
  open: propsOpen,
  onOpen,
  onClose,
  startOpen,
  trigger,
}) => {
  const closeButtonRef = useRef<React.ElementRef<typeof CloseButton>>(null);
  const containerRef = useRef<React.ElementRef<typeof Container>>(null);
  const triggerRef = useRef<React.ElementRef<typeof TriggerContainer>>(null);

  const [open, setOpen] = useState<boolean | null>(startOpen ? true : null);

  const { setHideChildrenOverflow } = useModal();

  useEffect(() => {
    if (propsOpen === undefined) return;
    setOpen(propsOpen ? true : null);
  }, [propsOpen]);

  useEffect(() => {
    if (open === null) return;

    if (open) {
      containerRef.current?.addEventListener(
        'transitionend',
        () => {
          closeButtonRef.current?.focus();
          setHideChildrenOverflow(true);
        },
        { once: true },
      );

      onOpen?.();
    } else {
      (triggerRef.current?.childNodes[0] as any)?.focus();
      setHideChildrenOverflow(false);
      onClose?.();
    }
  }, [open]);

  return (
    <>
      <TriggerContainer ref={triggerRef} onClick={() => setOpen(!open)}>
        {trigger}
      </TriggerContainer>

      <Container ref={containerRef} open={Boolean(open)}>
        <TitleContainer>
          <CloseButton ref={closeButtonRef} onClick={() => setOpen(false)}>
            <FiChevronLeft size="1.5em" />
          </CloseButton>
          <p>{title}</p>
        </TitleContainer>

        <Children>{children}</Children>
      </Container>
    </>
  );
};
