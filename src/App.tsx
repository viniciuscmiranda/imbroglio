import { Game } from 'components/Game';
import { DataProvider } from 'contexts/data';
import { GameProvider } from 'contexts/game';
import { ToastProvider } from 'contexts/toast';
import React from 'react';
import TagManager from 'react-gtm-module';
import { global } from 'styles';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const App: React.FC = () => {
  global();

  // PWA
  useRegisterSW({
    onRegistered: (r) => r && setInterval(() => r.update(), 60 * 60 * 1000),
  });

  React.useEffect(() => {
    TagManager.initialize({
      gtmId: 'GTM-WFWB5GG',
    });
  }, []);

  React.useEffect(() => {
    if (
      import.meta.env.PROD &&
      window.location.hostname !== 'localhost' &&
      window.location?.protocol !== 'https:'
    ) {
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
    </ToastProvider>
  );
};
