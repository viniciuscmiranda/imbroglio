import { APP_URL, GAME_NAME, ROWS_AMOUNT } from 'constants';
import { useData, useToast } from 'hooks';
import _ from 'lodash';
import moment from 'moment';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import { Letter, LetterType, Puzzle, Row, SpecialCharactersRow, Stats } from 'types';
import { deepSet, isMobile } from 'utils';

import { DataContextProps } from './data';

export type GameContextProps = {
  rows: Row[];
  letters: Letter[];
  correctRows: number[];
  specialCharactersRows: SpecialCharactersRow[];
  stats: Stats[];
  dropLetter: (letter: LetterType) => void;
  getSpecialCharactersRow: (row: Row, rowIndex: number) => Row;
  resetGame: () => void;
  shuffleBench: () => void;
  share: () => void;
  victory: boolean;
  lastSolution: DataContextProps['lastSolution'];
  puzzleId: Puzzle['id'];
  points: number;
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  setLetters: React.Dispatch<React.SetStateAction<Letter[]>>;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedRowIndex: number;
  storedWords: { [key: string]: string[] };
};

const LOCAL_ROW_KEY = 'ROWS';
export const LOCAL_STATS_KEY = 'STATS';
export const LOCAL_WORDS_KEY = 'WORDS';

export const GameContext = createContext({} as GameContextProps);

export const GameProvider: React.FC = ({ children }) => {
  const { words, initialLetters, puzzle, lastSolution } = useData();
  const { toast } = useToast();

  const initialRows = Array.from({ length: ROWS_AMOUNT }).map(() => []);

  const [victory, setVictory] = useState<GameContextProps['victory']>(false);
  const [rows, setRows] = useState<GameContextProps['rows']>(initialRows);
  const [letters, setLetters] = useState<GameContextProps['letters']>(initialLetters);
  const [correctRows, setCorrectRows] = useState<GameContextProps['correctRows']>([]);
  const [specialCharactersRows, setSpecialCharactersRows] = useState<
    SpecialCharactersRow[]
  >([]);
  const [selectedRowIndex, setSelectedRowIndex] =
    useState<GameContextProps['selectedRowIndex']>(-1);
  const [storedWords, setStoredWords] = useState<GameContextProps['storedWords']>(
    JSON.parse(localStorage.getItem(LOCAL_WORDS_KEY) || '{}'),
  );

  const [points, setPoints] = useState<GameContextProps['points']>(0);
  const [stats, setStats] = useState<GameContextProps['stats']>(
    JSON.parse(localStorage.getItem(LOCAL_STATS_KEY) || '[]'),
  );

  const dropLetter = useCallback(
    ({ letter, nextRowIndex, nextIndex, index, rowIndex }: LetterType) => {
      if (nextRowIndex === rowIndex && index === nextIndex) return;

      const nextRows = [...rows];
      const nextLetters = [...letters];

      const fromBench = typeof rowIndex !== 'number';
      const toBench = typeof nextRowIndex !== 'number';
      const fromBoard = typeof rowIndex === 'number';
      const toBoard = typeof nextRowIndex === 'number';

      if (fromBench) nextLetters.splice(index, 1);
      if (toBench) nextLetters.splice(nextIndex, 0, letter);
      if (fromBoard) nextRows[rowIndex].splice(index, 1);
      if (toBoard) nextRows[nextRowIndex].splice(nextIndex, 0, letter);

      if (toBoard) setSelectedRowIndex(nextRowIndex);

      setLetters(deepSet(nextLetters));
      setRows(nextRows.map((row) => deepSet(row)));
    },
    [rows, letters],
  );

  const getSpecialCharactersRow = useCallback(
    (row: Row, rowIndex: number) => {
      const specialCharacterRow = specialCharactersRows.find(
        (item) => item.rowIndex === rowIndex,
      );
      if (!specialCharacterRow) return row;

      return row.map((letter, letterIndex) => ({
        ...letter,
        content: specialCharacterRow.letters[letterIndex],
      }));
    },
    [specialCharactersRows, rows],
  );

  const resetGame = useCallback(
    (clearCorrectRows = false) => {
      const nextRows: Row[] = [];
      const nextLetters: Letter[][] = [];

      rows.forEach((row, rowIndex) => {
        if (correctRows.includes(rowIndex) && !clearCorrectRows) {
          nextRows.push(row);
        } else {
          nextLetters.push(row);
          nextRows.push([]);
        }
      });

      if (!nextLetters.flat().length && correctRows.length) {
        resetGame(true);
        setCorrectRows([]);
        return;
      }

      setRows(nextRows);
      setLetters((prevLetters) => [...prevLetters, ...nextLetters.flat()]);
    },
    [letters, rows, correctRows],
  );

  const shuffleBench = useCallback(() => {
    const nextLetters = _.shuffle(letters);
    setLetters(nextLetters);
  }, [letters]);

  const share = useCallback(() => {
    const benchLetters = rows.reduce((acc, row, rowIndex) => {
      if (correctRows.includes(rowIndex)) return acc;
      else return acc + row.length;
    }, letters.length);

    const correctRowsContent: string[] = [];
    rows.forEach((row, rowIndex) => {
      if (!correctRows.includes(rowIndex)) return;
      for (const _letter of row) correctRowsContent.push('🟩');
      correctRowsContent.push('\n');
    });

    const shareContent: string[] | string = [];

    shareContent.push(`🔡 ${GAME_NAME} #${puzzle.id}`);
    if (benchLetters) shareContent.push(`🟦 ${benchLetters} letras na bancada`);
    shareContent.push(``);
    shareContent.push(`⭐ ${points} pontos`);
    shareContent.push(correctRowsContent.join(''));
    shareContent.push(APP_URL);

    try {
      if (isMobile()) {
        navigator.share({
          title: GAME_NAME,
          text: shareContent.join('\n'),
        });
      } else {
        throw new Error('Not mobile');
      }
    } catch (err) {
      navigator.clipboard
        .writeText(shareContent.join('\n'))
        .then(() => {
          toast('Copiado!', 'share');
        })
        .catch(() => toast('Erro ao compartilhar :(', 'share'));
    }
  }, [points, correctRows, rows, puzzle]);

  function win() {
    const storedVictory = stats.find(({ puzzleId }) => puzzleId === puzzle.id);
    const showVictory = storedVictory ? storedVictory.points < points : true;

    if (showVictory) {
      const statsData: Stats = {
        puzzleId: puzzle.id,
        date: moment().format('YYYY-MM-DD'),
        points: points,
        words: specialCharactersRows.map((row) => {
          const word = row.letters.join('');
          return _.capitalize(word);
        }),
      };

      const dataLayer = {
        points,
        words: statsData.words.join(', '),
        puzzleId: puzzle.id,
      };

      if (!storedVictory) {
        setVictory(true);
        toast('Vitória!');

        TagManager.dataLayer({
          dataLayer: {
            event: 'win',
            ...dataLayer,
          },
        });
      } else {
        toast('Novo record diário!');

        TagManager.dataLayer({
          dataLayer: {
            event: 'record',
            ...dataLayer,
          },
        });
      }

      setStats((prevStats) => {
        const nextStats = [
          ...prevStats.filter(({ puzzleId }) => puzzleId !== puzzle.id),
          statsData,
        ];

        localStorage.setItem(LOCAL_STATS_KEY, JSON.stringify(nextStats));
        return nextStats;
      });
    }
  }

  // get stored data
  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_ROW_KEY);
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);

    if (parsedData.puzzleId !== puzzle.id) {
      localStorage.removeItem(LOCAL_ROW_KEY);
      return;
    }

    const nextRows = parsedData.rows as string[][];
    const rowsSample = [...nextRows].flat();

    const nextLetters: Letter[] = [];

    letters.forEach((letter) => {
      const foundLetter = rowsSample.find((content, index) => {
        if (content === letter.content) {
          rowsSample.splice(index, 1);
          return true;
        }
      });

      if (!foundLetter) {
        nextLetters.push(letter);
      }
    });

    setLetters(nextLetters);
    setRows(
      nextRows.map((row) =>
        row.map((content) => ({ content, id: String(Math.random()) })),
      ),
    );
  }, []);

  // check words
  useEffect(() => {
    const nextCorrectRows: number[] = [];
    const nextSpecialCharactersRows: SpecialCharactersRow[] = [];

    rows.forEach((row, rowIndex) => {
      const word = row.map((letter) => letter.content).join('');
      const foundWord = words.find((item) => item.normalized === word);

      if (foundWord) {
        nextCorrectRows.push(rowIndex);
        nextSpecialCharactersRows.push({
          rowIndex,
          letters: foundWord.word.split(''),
        });
      }
    });

    setSpecialCharactersRows((prevSpecialCharactersRows) => {
      const prevWords = prevSpecialCharactersRows.map((row) => row.letters.join(''));
      const nextWords = nextSpecialCharactersRows.map((row) => row.letters.join(''));

      const today = moment().format('YYYY-MM-DD');

      setStoredWords((prevStoredWords) => {
        const nextStoredWords = { ...prevStoredWords };

        nextWords.forEach((word) => {
          if (prevWords.includes(word) || nextStoredWords[today]?.includes(word)) return;
          if (!nextStoredWords[today]) nextStoredWords[today] = [];

          nextStoredWords[today].push(_.capitalize(word));

          TagManager.dataLayer({
            dataLayer: {
              event: 'word',
              word: _.capitalize(word),
            },
          });
        });

        return nextStoredWords;
      });

      return nextSpecialCharactersRows;
    });

    setCorrectRows(nextCorrectRows);
    localStorage.setItem(
      LOCAL_ROW_KEY,
      JSON.stringify({
        puzzleId: puzzle.id,
        rows: rows.map((row) => row.map(({ content }) => content)),
      }),
    );
  }, [rows]);

  // check win
  useEffect(() => {
    const allRowsCorrect = correctRows.length === rows.filter((row) => row.length).length;
    const noLettersInBench = letters.length === 0;

    if (allRowsCorrect && noLettersInBench) win();
  }, [points]);

  // set points
  useEffect(() => {
    const nextPoints = rows.reduce((acc, row, rowIndex) => {
      if (!correctRows.includes(rowIndex)) return acc;
      return acc + row.length * row.length;
    }, 0);
    setPoints(nextPoints);
  }, [rows, correctRows]);

  useEffect(() => {
    const nextStoredWords = { ...storedWords };

    const shouldUpdate = Object.entries(storedWords).some(([day, words]) => {
      const nextWords = Array.from(new Set(words));
      nextStoredWords[day] = nextWords;

      return nextWords.length !== words.length;
    });

    localStorage.setItem(LOCAL_WORDS_KEY, JSON.stringify(nextStoredWords));

    if (shouldUpdate) setStoredWords(nextStoredWords);
  }, [storedWords]);

  return (
    <GameContext.Provider
      value={{
        rows,
        letters,
        correctRows,
        specialCharactersRows,
        puzzleId: puzzle.id,
        points,
        stats,
        lastSolution,
        victory,
        dropLetter,
        getSpecialCharactersRow,
        resetGame,
        shuffleBench,
        share,
        setLetters,
        setRows,
        setSelectedRowIndex,
        selectedRowIndex,
        storedWords,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
