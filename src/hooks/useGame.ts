import { GameContext } from 'contexts/game';
import { useContext } from 'react';

export const useGame = () => useContext(GameContext);
