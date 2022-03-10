import puzzles from 'assets/data/puzzles.json';
import words from 'assets/data/words.json';
import { ROWS_AMOUNT } from 'constants';
import React, { createContext, useCallback, useEffect, useState } from 'react';

type Puzzle = {
  id: number;
  date: string;
  letters: string[];
};

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

type SpecialCharatersRow = {
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
  specialCharactersRows: SpecialCharatersRow[];
  dropLetter: (letter: LetterType) => void;
  getSpecialCharactersRow: (row: Row, rowIndex: number) => Row;
  puzzleIndex: number;
};

function getPuzzle(random?: boolean) {
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

    if (puzzle) return { puzzle, puzzleIndex };
  }

  puzzleIndex = Math.floor(Math.random() * puzzles.length);
  puzzle = (puzzles as Puzzle[])[puzzleIndex];

  return { puzzle, puzzleIndex };
}

const { puzzle, puzzleIndex } = getPuzzle();

const initialLetters = puzzle.letters.map((content) => ({
  id: String(Math.random()),
  content,
}));

const LOCAL_ROW_KEY = 'ROWS';
const LOCAL_WINS_KEY = 'WINS';

export const GameContext = createContext({} as GameContextProps);

export const GameProvider: React.FC = ({ children }) => {
  const [letters, setLetters] = useState<Letter[]>(initialLetters);
  const [correctRows, setCorrectRows] = useState<number[]>([]);
  const [specialCharactersRows, setSpecialCharactersRows] = useState<
    SpecialCharatersRow[]
  >([]);
  const [wins, setWins] = useState<number[]>(
    JSON.parse(localStorage.getItem(LOCAL_WINS_KEY) || '[]'),
  );
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
    const nextInitialRows: SpecialCharatersRow[] = [];

    rows.forEach((row, rowIndex) => {
      const word = row.map((letter) => letter.content).join('');
      const foundWord = (words as Word[]).find((item) => item.normalized === word);

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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
