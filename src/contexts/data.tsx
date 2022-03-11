import { Loading } from 'components/Loading';
import { MAX_REQUEST_TRIES } from 'constants';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Letter, Puzzle, Word } from 'types';

type DataContextProps = {
  words: Word[];
  puzzles: Puzzle[];
  puzzle: Puzzle;
  puzzleIndex: number;
  initialLetters: Letter[];

  getPuzzle: (random: boolean) => {
    puzzle: Puzzle;
    puzzleIndex: number;
    initialLetters: Letter[];
  };
};

export const DataContext = createContext({} as DataContextProps);

export const DataProvider: React.FC = ({ children }) => {
  const [words, setWords] = useState<DataContextProps['words']>([]);
  const [puzzles, setPuzzles] = useState<DataContextProps['puzzles']>([]);
  const [puzzle, setPuzzle] = useState<DataContextProps['puzzle'] | null>(null);
  const [puzzleIndex, setPuzzleIndex] = useState<DataContextProps['puzzleIndex']>(0);
  const [initialLetters, setInitialLetters] = useState<
    DataContextProps['initialLetters']
  >([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [requestTry, setRequestTry] = useState(0);

  const getData = useCallback(async () => {
    setLoading(true);

    try {
      const [puzzlesRes, wordsRes] = await Promise.all([
        fetch('https://joaolucas26.github.io/imbroglio-data/daily_puzzles_6.json'),
        fetch('https://joaolucas26.github.io/imbroglio-data/words.json'),
      ]);

      const [puzzlesData, wordsData] = await Promise.all([
        puzzlesRes.json(),
        wordsRes.json(),
      ]);

      setWords(wordsData);
      setPuzzles(puzzlesData);
    } catch {
      if (requestTry < MAX_REQUEST_TRIES) {
        setRequestTry(requestTry + 1);
        getData();
      } else {
        setError(true);
      }
    }

    setLoading(false);
  }, [requestTry]);

  const getPuzzle = useCallback(
    (random?: boolean) => {
      let puzzleIndex = 0;
      let puzzle: Puzzle | undefined;

      if (!random) {
        puzzle = (puzzles as Puzzle[]).find((p, i) => {
          if (new Date(p.date).getDate() === new Date().getDate()) {
            puzzleIndex = i + 1;
            return true;
          }

          return false;
        });
      }

      if (random || !puzzle) {
        puzzleIndex = Math.floor(Math.random() * puzzles.length);
        puzzle = (puzzles as Puzzle[])[puzzleIndex];
      }

      const initialLetters = puzzle.letters.map((content) => ({
        id: String(Math.random()),
        content,
      }));

      return { puzzle, puzzleIndex, initialLetters };
    },
    [puzzles],
  );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!puzzles.length) return;

    const data = getPuzzle();
    setPuzzle(data.puzzle);
    setPuzzleIndex(data.puzzleIndex);
    setInitialLetters(data.initialLetters);
  }, [puzzles]);

  if (loading || !puzzle) return <Loading error={error || (!loading && !puzzle)} />;

  return (
    <DataContext.Provider
      value={{ words, puzzles, puzzle, puzzleIndex, initialLetters, getPuzzle }}
    >
      {children}
    </DataContext.Provider>
  );
};
