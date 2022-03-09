import { Game } from 'components/Game';
import { GameProvider } from 'contexts/game';
import React from 'react';
import { global } from 'styles';

export const App: React.FC = () => {
  global();

  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
};
