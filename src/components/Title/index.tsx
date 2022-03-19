import { GAME_NAME } from 'constants';
import { useGame } from 'hooks';
import React from 'react';

import { Container, GameTitle } from './styles';

export const Title: React.FC = () => {
  const { puzzleId } = useGame();

  return (
    <Container data-gtm="Logo">
      <img src="/images/logo.svg" alt="" />
      <GameTitle>
        {GAME_NAME}
        <span>#{puzzleId}</span>
      </GameTitle>
    </Container>
  );
};
