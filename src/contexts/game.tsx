import puzzles from 'assets/data/puzzles.json';
import words from 'assets/data/words.json';
import { ROWS_AMOUNT } from 'contants';
import _ from 'lodash';
import React, { createContext, useCallback, useEffect, useState } from 'react';

type Word = {
  id: number;
  word: string;
  normalized: string;
};

type Letter = {
  id: string;
  content: string;
};

type Row = Letter[];

type originalRow = {
  rowIndex: number;
  letters: string[];
};

type LetterType = {
  letter: Letter;
  index: number;
  nextIndex: number;
  nextRowIndex?: number;
  rowIndex?: number;
};

type GameContextProps = {
  rows: Row[];
  letters: Letter[];
  correctRows: number[];
  originalRows: originalRow[];
  dropLetter: (letter: LetterType) => void;
  getOriginalRow: (row: Row, rowIndex: number) => Row;
};

const LOCAL_ROW_KEY = 'ROWS';

export const GameContext = createContext({} as GameContextProps);

export const GameProvider: React.FC = ({ children }) => {
  const puzzle =
    puzzles.find((p) => new Date(p.date).getDate() === new Date().getDate()) ||
    puzzles[Math.floor(Math.random() * puzzles.length)];

  const initialLetters = puzzle.letters.map((content) => ({
    id: _.uniqueId(),
    content,
  }));

  const [letters, setLetters] = useState<Letter[]>(initialLetters);
  const [correctRows, setCorrectRows] = useState<number[]>([]);
  const [originalRows, setOriginalRows] = useState<originalRow[]>([]);
  const [rows, setRows] = useState<Row[]>(
    Array.from({ length: ROWS_AMOUNT }).map(() => []),
  );

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

  const getOriginalRow = useCallback(
    (row: Row, rowIndex: number) => {
      const originalRow = originalRows.find((item) => item.rowIndex === rowIndex);
      if (!originalRow) return row;

      return row.map((letter, letterIndex) => ({
        ...letter,
        content: originalRow.letters[letterIndex],
      }));
    },
    [originalRows, rows],
  );

  useEffect(() => {
    const storedRows = localStorage.getItem(LOCAL_ROW_KEY);

    if (!storedRows) return;
    const nextRows = JSON.parse(storedRows) as Row[];
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
    const wordsList: Word[] = [
      ...words,
      ...[
        'amor',
        'amora',
        'amarra',
        'roma',
        'marrom',
        'cama',
        'feira',
        'forma',
        'mora',
        'carro',
        'caro',
      ].map((word) => ({ word, id: Number(_.uniqueId()), normalized: word })),
    ];

    wordsList.push({
      id: Number(_.uniqueId()),
      word: 'força',
      normalized: 'forca',
    });

    wordsList.push({
      id: Number(_.uniqueId()),
      word: 'laço',
      normalized: 'laco',
    });

    const nextCorrectRows: number[] = [];
    const nextOriginalRows: originalRow[] = [];

    rows.forEach((row, rowIndex) => {
      const word = row.map((letter) => letter.content).join('');
      const foundWord = wordsList.find((item) => item.normalized === word);

      if (foundWord) {
        nextCorrectRows.push(rowIndex);
        nextOriginalRows.push({
          rowIndex,
          letters: foundWord.word.split(''),
        });
      }
    });

    localStorage.setItem(LOCAL_ROW_KEY, JSON.stringify(rows));
    setOriginalRows(nextOriginalRows);
    setCorrectRows(nextCorrectRows);
  }, [rows]);

  return (
    <GameContext.Provider
      value={{ rows, letters, correctRows, originalRows, dropLetter, getOriginalRow }}
    >
      {children}
    </GameContext.Provider>
  );
};
