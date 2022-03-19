import { Fallback } from 'components/Fallback';
import { MAX_REQUEST_RETRIES, REQUEST_TIMEOUT } from 'constants';
import moment from 'moment';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Letter, Puzzle, Word } from 'types';

export type DataContextProps = {
  words: Word[];
  puzzles: Puzzle[];
  puzzle: Puzzle;
  initialLetters: Letter[];
  lastSolution: string[] | null;

  getPuzzle: (random: boolean) => {
    puzzle: Puzzle;
    initialLetters: Letter[];
    lastSolution: string[] | null;
  };
};

export const DataContext = createContext({} as DataContextProps);

export const DataProvider: React.FC = ({ children }) => {
  const [lastSolution, setLastSolution] =
    useState<DataContextProps['lastSolution']>(null);
  const [words, setWords] = useState<DataContextProps['words']>([]);
  const [puzzles, setPuzzles] = useState<DataContextProps['puzzles']>([]);
  const [puzzle, setPuzzle] = useState<DataContextProps['puzzle'] | null>(null);
  const [initialLetters, setInitialLetters] = useState<
    DataContextProps['initialLetters']
  >([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [requestTry, setRequestTry] = useState(1);

  const getData = useCallback(async () => {
    setLoading(true);

    try {
      const [puzzlesRes, wordsRes] = await Promise.all([
        fetch('https://joaolucas26.github.io/imbroglio-data/daily_puzzles_6.json'),
        fetch('https://joaolucas26.github.io/imbroglio-data/words.json'),
      ]);

      const puzzlesData = await puzzlesRes.json();
      const wordsData = await wordsRes.json();

      setWords(wordsData);
      setPuzzles(puzzlesData);

      setLoading(false);
    } catch {
      if (requestTry <= MAX_REQUEST_RETRIES) {
        setRequestTry((prevRequestTry) => prevRequestTry + 1);
      } else {
        setError(true);
        setLoading(false);
      }
    }
  }, [requestTry]);

  const getPuzzle = useCallback(
    (random?: boolean) => {
      let nextPuzzle: Puzzle | undefined;
      let nextLastSolution: string[] | null = null;

      if (!random) {
        nextPuzzle = puzzles.find((p, pIndex) => {
          if (moment(p.date).isSame(moment(), 'day')) {
            nextLastSolution = puzzles[pIndex - 1]?.solution || null;
            return true;
          }

          return false;
        });
      }

      if (random || !nextPuzzle) {
        const puzzleIndex = Math.floor(Math.random() * puzzles.length);
        nextPuzzle = puzzles[puzzleIndex];
      }

      const nextInitialLetters = nextPuzzle.letters.map((content) => ({
        id: String(Math.random()),
        content,
      }));

      return {
        puzzle: nextPuzzle,
        lastSolution: nextLastSolution,
        initialLetters: nextInitialLetters,
      };
    },
    [puzzles],
  );

  useEffect(() => {
    if (requestTry > 1) setTimeout(() => getData(), REQUEST_TIMEOUT);
    else getData();
  }, [requestTry]);

  useEffect(() => {
    if (!puzzles.length) return;

    const data = getPuzzle();
    setPuzzle(data.puzzle);
    setInitialLetters(data.initialLetters);
    setLastSolution(data.lastSolution);
  }, [puzzles]);

  if (loading) return <Fallback />;
  if (!puzzle || error) return <Fallback error={error} />;

  return (
    <DataContext.Provider
      value={{ words, puzzles, puzzle, initialLetters, lastSolution, getPuzzle }}
    >
      {children}
    </DataContext.Provider>
  );
};
