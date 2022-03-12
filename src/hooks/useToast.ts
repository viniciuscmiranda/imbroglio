import { ToastContext } from 'contexts/toast';
import { useContext } from 'react';

export const useToast = () => useContext(ToastContext);
