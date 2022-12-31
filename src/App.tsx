import { Game } from 'components/Game';
import { STATS_SEARCH_PARAM_KEY } from 'constants';
import { DataProvider } from 'contexts/data';
import { GameProvider, LOCAL_STATS_KEY } from 'contexts/game';
import { KeyboardProvider } from 'contexts/keyboard';
import { ToastProvider } from 'contexts/toast';
import React, { useLayoutEffect } from 'react';
import TagManager from 'react-gtm-module';
import { global } from 'styles';
import type { Stats } from 'types';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const App: React.FC = () => {
  // exports data from old domain
  useLayoutEffect(() => {
    try {
      const search = new URLSearchParams(window.location.search);

      const statsJSON = search.get(STATS_SEARCH_PARAM_KEY);
      if (!statsJSON) return;
      const stats: Stats[] = JSON.parse(statsJSON) || [];

      const localStatsJSON = localStorage.getItem(LOCAL_STATS_KEY) || '[]';
      const localStats: Stats[] = JSON.parse(localStatsJSON) || [];

      const nextStats = stats
        .map((stat) => {
          const localStat = localStats.find((s) => {
            return s.puzzleId === stat.puzzleId;
          });

          return localStat ? null : stat;
        })
        .filter(Boolean);

      localStorage.setItem(
        LOCAL_STATS_KEY,
        JSON.stringify([...nextStats, ...localStats]),
      );

      search.delete(STATS_SEARCH_PARAM_KEY);
      window.location.search = search.toString();
    } catch {
      //
    }
  }, []);

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
