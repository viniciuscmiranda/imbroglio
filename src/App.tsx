import { Game } from 'components/Game';
import { DataProvider } from 'contexts/data';
import { GameProvider } from 'contexts/game';
import React from 'react';
import { global } from 'styles';

export const App: React.FC = () => {
  global();

  return (
    <DataProvider>
      <GameProvider>
        <Game />
      </GameProvider>
    </DataProvider>
  );
};
