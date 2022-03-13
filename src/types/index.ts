export type Puzzle = {
  id: number;
  date: string;
  letters: string[];
  solution: string[];
};

export type Word = {
  id: number;
  word: string;
  normalized: string;
};

export type Letter = {
  id: string;
  content: string;
};

export type Row = Letter[];

export type SpecialCharactersRow = {
  rowIndex: number;
  letters: string[];
};

export type LetterType = {
  letter: Letter;
  index: number;
  nextIndex: number;
  nextRowIndex?: number;
  rowIndex?: number;
};

export type Stats = {
  puzzleId: Puzzle['id'];
  date: Puzzle['date'];
  points: number;
  words: string[];
};
