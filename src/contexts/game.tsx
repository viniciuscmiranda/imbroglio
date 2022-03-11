import { ROWS_AMOUNT } from 'constants';
import { useData } from 'hooks';
import _ from 'lodash';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Letter, LetterType, Row, SpecialCharactersRow } from 'types';

type GameContextProps = {
  rows: Row[];
  letters: Letter[];
  correctRows: number[];
  specialCharactersRows: SpecialCharactersRow[];
  dropLetter: (letter: LetterType) => void;
  getSpecialCharactersRow: (row: Row, rowIndex: number) => Row;
  resetGame: () => void;
  shuffleBench: () => void;
  puzzleIndex: number;
};

const LOCAL_ROW_KEY = 'ROWS';
const LOCAL_WINS_KEY = 'WINS';

export const GameContext = createContext({} as GameContextProps);

export const GameProvider: React.FC = ({ children }) => {
  const { words, initialLetters, puzzle, puzzleIndex } = useData();

  const initialRows = Array.from({ length: ROWS_AMOUNT }).map(() => []);

  const [letters, setLetters] = useState<Letter[]>(initialLetters);
  const [correctRows, setCorrectRows] = useState<number[]>([]);
  const [specialCharactersRows, setSpecialCharactersRows] = useState<
    SpecialCharactersRow[]
  >([]);
  const [wins, setWins] = useState<number[]>(
    JSON.parse(localStorage.getItem(LOCAL_WINS_KEY) || '[]'),
  );
  const [rows, setRows] = useState<Row[]>(initialRows);

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

  const resetGame = useCallback(() => {
    setCorrectRows([]);
    setRows(initialRows);
    setLetters(initialLetters);
  }, [letters, rows, correctRows]);

  const shuffleBench = useCallback(() => {
    const nextLetters = _.shuffle(letters);
    setLetters(nextLetters);
  }, [letters]);

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

  useEffect(() => {
    const allRowsCorrect = correctRows.length === ROWS_AMOUNT;
    const noLettersInBench = letters.length === 0;
    const firstWin = !wins.includes(puzzleIndex);

    if (allRowsCorrect && noLettersInBench && firstWin) {
      alert('Ganhastes 🎉');
      setWins((prevWins) => [...prevWins, puzzleIndex]);
    }
  }, [correctRows]);

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
        puzzleIndex,
        dropLetter,
        getSpecialCharactersRow,
        resetGame,
        shuffleBench,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
