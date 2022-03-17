import { KeyboardContext } from 'contexts/keyboard';
import { useContext } from 'react';

export const useKeyboard = () => useContext(KeyboardContext);
