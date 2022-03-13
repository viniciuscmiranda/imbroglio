import { APP_URL, GAME_NAME, ROWS_AMOUNT } from 'constants';
import { useData, useToast } from 'hooks';
import _ from 'lodash';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Letter, LetterType, Puzzle, Row, SpecialCharactersRow } from 'types';
import { isMobile } from 'utils';

import { DataContextProps } from './data';

export type GameContextProps = {
  rows: Row[];
  letters: Letter[];
  correctRows: number[];
  specialCharactersRows: SpecialCharactersRow[];
  dropLetter: (letter: LetterType) => void;
  getSpecialCharactersRow: (row: Row, rowIndex: number) => Row;
  resetGame: () => void;
  shuffleBench: () => void;
  share: () => void;
  lastSolution: DataContextProps['lastSolution'];
  puzzleId: Puzzle['id'];
  points: number;
};

const LOCAL_ROW_KEY = 'ROWS';
const LOCAL_WINS_KEY = 'WINS';

export const GameContext = createContext({} as GameContextProps);

export const GameProvider: React.FC = ({ children }) => {
  const { words, initialLetters, puzzle, lastSolution } = useData();
  const { toast } = useToast();

  const initialRows = Array.from({ length: ROWS_AMOUNT }).map(() => []);

  const [rows, setRows] = useState<GameContextProps['rows']>(initialRows);
  const [letters, setLetters] = useState<GameContextProps['letters']>(initialLetters);
  const [correctRows, setCorrectRows] = useState<GameContextProps['correctRows']>([]);
  const [specialCharactersRows, setSpecialCharactersRows] = useState<
    SpecialCharactersRow[]
  >([]);

  const [points, setPoints] = useState<GameContextProps['points']>(0);
  const [wins, setWins] = useState<number[]>(
    JSON.parse(localStorage.getItem(LOCAL_WINS_KEY) || '[]'),
  );

  const win = useCallback(() => {
    alert('Ganhastes 🎉');
    setWins((prevWins) => [...prevWins, puzzle.id]);
  }, [wins]);

  const dropLetter = useCallback(
    ({ letter, nextRowIndex, nextIndex, index, rowIndex }: LetterType) => {
      if (nextRowIndex === rowIndex && index === nextIndex) return;

      const nextRows = [...rows];
      const nextLetters = [...letters];

      const fromUnused = typeof rowIndex !== 'number';
      const toUnused = typeof nextRowIndex !== 'number';
      const fromRow = typeof rowIndex === 'number';
      const toRow = typeof nextRowIndex === 'number';

      if (fromUnused && toUnused) {
        nextLetters.splice(index, 1);
        nextLetters.splice(nextIndex, 0, letter);
      } else if (fromUnused && toRow) {
        nextLetters.splice(index, 1);
        nextRows[nextRowIndex].splice(nextIndex, 0, letter);
      } else if (fromRow && toUnused) {
        nextRows[rowIndex].splice(index, 1);
        nextLetters.splice(nextIndex, 0, letter);
      } else if (fromRow && toRow) {
        nextRows[rowIndex].splice(index, 1);
        nextRows[nextRowIndex].splice(nextIndex, 0, letter);
      }

      setRows(nextRows);
      setLetters(nextLetters);
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
    const unusedLetters = rows.reduce((acc, row, rowIndex) => {
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

    shareContent.push(`🔡 ${GAME_NAME}#${puzzle.id}`);
    shareContent.push(`🟦 ${unusedLetters} letras não usadas`);
    shareContent.push(``);
    shareContent.push(`⭐ ${points} pontos`);
    shareContent.push(correctRowsContent.join(''));
    shareContent.push('Jogue comigo!');
    shareContent.push(APP_URL);

    if (isMobile()) {
      navigator.share({
        title: GAME_NAME,
        text: shareContent.join('\n'),
      });
    } else {
      navigator.clipboard.writeText(shareContent.join('\n')).then(() => {
        toast('Copiado!');
      });
    }
  }, [points, correctRows, rows, puzzle]);

  // get stored data
  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_ROW_KEY);
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);

    if (parsedData.puzzleId !== puzzle.id) {
      localStorage.removeItem(LOCAL_ROW_KEY);
      return;
    }

    const nextRows = parsedData.rows as Row[];
    let rowsSample = [...nextRows].flat();

    const nextLetters: Letter[] = [];

    letters.forEach((letter) => {
      const foundLetter = rowsSample.find(({ content }) => content === letter.content);

      if (foundLetter) {
        rowsSample = rowsSample.filter(({ id }) => id !== foundLetter.id);
      } else {
        nextLetters.push(letter);
      }
    });

    setRows(nextRows);
    setLetters(nextLetters);
  }, []);

  // check words
  useEffect(() => {
    const nextCorrectRows: number[] = [];
    const nextInitialRows: SpecialCharactersRow[] = [];

    rows.forEach((row, rowIndex) => {
      const word = row.map((letter) => letter.content).join('');
      const foundWord = words.find((item) => item.normalized === word);

      if (foundWord) {
        nextCorrectRows.push(rowIndex);
        nextInitialRows.push({
          rowIndex,
          letters: foundWord.word.split(''),
        });
      }
    });

    localStorage.setItem(LOCAL_ROW_KEY, JSON.stringify({ puzzleId: puzzle.id, rows }));
    setSpecialCharactersRows(nextInitialRows);
    setCorrectRows(nextCorrectRows);
  }, [rows]);

  // check win
  useEffect(() => {
    const allRowsCorrect = correctRows.length === rows.filter((row) => row.length).length;
    const noLettersInBench = letters.length === 0;
    const firstWin = !wins.includes(puzzle.id);

    if (allRowsCorrect && noLettersInBench && firstWin) win();
  }, [correctRows]);

  // set points
  useEffect(() => {
    const nextPoints = rows.reduce((acc, row, rowIndex) => {
      if (!correctRows.includes(rowIndex)) return acc;
      return acc + row.length * row.length;
    }, 0);

    setPoints(nextPoints);
  }, [rows, correctRows]);

  useEffect(() => {
    localStorage.setItem(LOCAL_WINS_KEY, JSON.stringify(wins));
  }, [wins]);

  return (
    <GameContext.Provider
      value={{
        rows,
        letters,
        correctRows,
        specialCharactersRows,
        puzzleId: puzzle.id,
        points,
        lastSolution,
        dropLetter,
        getSpecialCharactersRow,
        resetGame,
        shuffleBench,
        share,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
