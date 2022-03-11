import { GAME_NAME } from 'constants';
import { useGame } from 'hooks';
import React from 'react';

import { GameTitle } from './styles';

export const Title: React.FC = () => {
  const { puzzleIndex } = useGame();

  return (
    <GameTitle>
      {GAME_NAME}
      <span>#{puzzleIndex}</span>
    </GameTitle>
  );
};
