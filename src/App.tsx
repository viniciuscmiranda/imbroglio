import { Game } from 'components/Game';
import { Toasts } from 'components/Toasts';
import { DataProvider } from 'contexts/data';
import { GameProvider } from 'contexts/game';
import { ToastProvider } from 'contexts/toast';
import React from 'react';
import { global } from 'styles';

export const App: React.FC = () => {
  global();

  React.useEffect(() => {
    if (import.meta.env.PROD && window.location?.protocol !== 'https:') {
      window.location.protocol = 'https:';
    }
  }, []);

  return (
    <ToastProvider>
      <DataProvider>
        <GameProvider>
          <Game />
        </GameProvider>
      </DataProvider>

      <Toasts />
    </ToastProvider>
  );
};
