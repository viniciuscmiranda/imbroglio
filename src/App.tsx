import { Game } from 'components/Game';
import { STATS_SEARCH_PARAM_KEY, WORDS_SEARCH_PARAM_KEY } from 'constants';
import { DataProvider } from 'contexts/data';
import { GameProvider, LOCAL_STATS_KEY, LOCAL_WORDS_KEY } from 'contexts/game';
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
      const wordsJSON = search.get(WORDS_SEARCH_PARAM_KEY);
      if (!statsJSON && !wordsJSON) return;
      const stats: Stats[] = JSON.parse(statsJSON || '[]');
      const words: Record<string, string[]> = JSON.parse(wordsJSON || '{}');

      const localStatsJSON = localStorage.getItem(LOCAL_STATS_KEY) || '[]';
      const localStats: Stats[] = JSON.parse(localStatsJSON);
      const localWordsJSON = localStorage.getItem(LOCAL_WORDS_KEY) || '{}';
      const localWords: Record<string, string[]> = JSON.parse(localWordsJSON);

      const nextWords = [...Object.keys(words), ...Object.keys(localWords)].reduce(
        (acc: Record<string, string[]>, dateKey) => {
          const dateLocalWords = localWords[dateKey] || [];
          const dateWords = words[dateKey] || [];

          const w = [...dateLocalWords, ...dateWords];
          if (w.length) acc[dateKey] = w;
          return acc;
        },
        {},
      );

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

      localStorage.setItem(LOCAL_WORDS_KEY, JSON.stringify(nextWords));

      search.delete(STATS_SEARCH_PARAM_KEY);
      search.delete(WORDS_SEARCH_PARAM_KEY);
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
