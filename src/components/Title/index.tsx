import { useGame } from 'hooks';
import React from 'react';

import { GameTitle } from './styles';

export const Title: React.FC = () => {
  const { puzzleIndex } = useGame();

  return (
    <GameTitle>
      imbróglio<span>#{puzzleIndex}</span>
    </GameTitle>
  );
};
