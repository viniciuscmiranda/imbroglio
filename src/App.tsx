import { Game } from 'components/Game';
import { DataProvider } from 'contexts/data';
import { GameProvider } from 'contexts/game';
import { KeyboardProvider } from 'contexts/keyboard';
import { ToastProvider } from 'contexts/toast';
import React from 'react';
import TagManager from 'react-gtm-module';
import { global } from 'styles';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const App: React.FC = () => {
  // initialize pwa
  useRegisterSW({
    onRegistered: (r) => r && setInterval(() => r.update(), 60 * 60 * 2000),
  });

  // force https
  if (
    import.meta.env.PROD &&
    window.location.hostname !== 'localhost' &&
    window.location?.protocol !== 'https:'
  ) {
    window.location.protocol = 'https:';
  }

  // initialize tag manager
  TagManager.initialize({
    gtmId: 'GTM-WFWB5GG',
  });

  // initialize global styles
  global();

  return (
    <ToastProvider>
      <DataProvider>
        <GameProvider>
          <KeyboardProvider>
            <Game />
          </KeyboardProvider>
        </GameProvider>
      </DataProvider>
    </ToastProvider>
  );
};
