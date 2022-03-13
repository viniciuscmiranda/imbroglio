import { MAX_TOASTS, TOAST_TIMEOUT } from 'constants';
import React, { createContext, useCallback, useState } from 'react';

export type Toast = {
  id: number | string;
  content: string;
};

export type ToastContextProps = {
  toasts: Toast[];
  exitingToasts: Toast['id'][];
  toast: (content: string, toastId?: number | string) => void;
};

export const ToastContext = createContext({} as ToastContextProps);

export const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastContextProps['toasts']>([]);
  const [exitingToasts, setExitingToasts] = useState<ToastContextProps['exitingToasts']>(
    [],
  );

  const toast = useCallback(
    (content: string, toastId?: number | string) => {
      const toastData = {
        id: toastId || Math.random(),
        content,
      };

      setToasts((prevToasts) => {
        if (
          prevToasts.length >= MAX_TOASTS ||
          prevToasts.find(({ id }) => toastId === id)
        ) {
          return prevToasts;
        }

        setTimeout(() => {
          setExitingToasts((prevExitingToasts) => [...prevExitingToasts, toastData.id]);
        }, TOAST_TIMEOUT - 500);

        setTimeout(() => {
          setToasts((prevToasts) => prevToasts.filter(({ id }) => id !== toastData.id));
          setExitingToasts((prevExitingToasts) =>
            prevExitingToasts.filter((id) => id !== toastData.id),
          );
        }, TOAST_TIMEOUT);

        return [...prevToasts, toastData];
      });
    },
    [toasts],
  );

  return (
    <ToastContext.Provider value={{ toast, toasts, exitingToasts }}>
      {children}
    </ToastContext.Provider>
  );
};
