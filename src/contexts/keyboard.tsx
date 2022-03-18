import { ROWS_AMOUNT } from 'constants';
import { useGame } from 'hooks';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Letter, Row } from 'types';

import { GameContextProps } from './game';

export type KeyboardContextProps = {
  selectedRowIndex: number;
  selectedRow: Row | null;
  setSelectedRowIndex: GameContextProps['setSelectedRowIndex'];
};

export const KeyboardContext = createContext({} as KeyboardContextProps);

export const KeyboardProvider: React.FC = ({ children }) => {
  const {
    letters,
    rows,
    selectedRowIndex,
    dropLetter,
    setLetters,
    shuffleBench,
    resetGame,
    setSelectedRowIndex,
    setRows,
  } = useGame();

  const [selectedRow, setSelectedRow] =
    useState<KeyboardContextProps['selectedRow']>(null);

  const getRow = useCallback(() => {
    const currentRow = selectedRow || rows[0];
    const currentRowIndex = selectedRow ? selectedRowIndex : 0;

    setSelectedRowIndex(currentRowIndex);

    return { currentRow, currentRowIndex };
  }, [rows, selectedRow]);

  const removeAllLetters = useCallback(() => {
    const { currentRow, currentRowIndex } = getRow();

    setLetters([...letters, ...(currentRow || [])]);
    setRows(
      rows.map((row, rowIndex) => {
        if (rowIndex === currentRowIndex) {
          return [];
        }

        return row;
      }),
    );
  }, [rows, selectedRow, letters]);

  const removeLastLetter = useCallback(() => {
    const { currentRow, currentRowIndex } = getRow();
    if (!currentRow.length) return;

    const letter = currentRow[currentRow.length - 1];

    dropLetter({
      letter,
      index: currentRow.length - 1,
      nextIndex: letters.length,
      rowIndex: currentRowIndex,
    });
  }, [selectedRow, letters]);

  const findAndPlaceLetter = useCallback(
    (key: string) => {
      const { currentRow, currentRowIndex } = getRow();

      key = key
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      // search in bench
      const nextIndex = currentRow.length;
      const nextRowIndex = currentRowIndex;

      let index: number = 0;
      let letter: Letter | undefined;
      letter = letters.find(({ content }, letterIndex) => {
        if (key === content) {
          index = letterIndex;
          return true;
        }
      });

      if (letter) {
        dropLetter({
          letter,
          index,
          nextIndex,
          nextRowIndex,
        });

        return;
      }

      // search in other rows
      let prevRowIndex: number = 0;
      for (const [rowIndex, row] of rows.entries()) {
        if (rowIndex === currentRowIndex) continue;

        letter = row.find(({ content }, letterIndex) => {
          if (key === content) {
            index = letterIndex;
            prevRowIndex = rowIndex;
            return true;
          }
        });

        if (letter) break;
      }

      if (letter) {
        dropLetter({
          letter,
          index,
          rowIndex: prevRowIndex,
          nextIndex,
          nextRowIndex,
        });

        return;
      }

      // search in selected row
      letter = currentRow.find(({ content }, letterIndex) => {
        if (content === key) {
          index = letterIndex;
          return true;
        }
      });

      if (letter) {
        dropLetter({
          letter,
          index,
          rowIndex: currentRowIndex,
          nextIndex,
          nextRowIndex,
        });
        return;
      }

      // letter not found
    },
    [letters, selectedRow, dropLetter],
  );

  const selectRow = useCallback(
    (step: 1 | -1) => {
      let nextSelectedRowIndex = selectedRowIndex + step;
      if (nextSelectedRowIndex < 0) nextSelectedRowIndex = ROWS_AMOUNT - 1;
      if (nextSelectedRowIndex > ROWS_AMOUNT - 1) nextSelectedRowIndex = 0;

      setSelectedRowIndex(nextSelectedRowIndex);
    },
    [selectedRowIndex],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.target !== document.body && event.key === 'Enter') return;

      switch (event.key) {
        case '1':
          shuffleBench();
          break;

        case '2':
          resetGame();
          break;

        case 'ArrowUp':
        case 'PageUp':
          selectRow(-1);
          break;

        case 'ArrowDown':
        case 'PageDown':
        case 'Enter':
          selectRow(1);
          break;

        case 'Backspace':
          removeLastLetter();
          break;

        case 'Delete':
          removeAllLetters();
          break;

        default:
          findAndPlaceLetter(event.key);
          break;
      }
    },
    [findAndPlaceLetter, selectRow, removeLastLetter],
  );

  useEffect(() => {
    setSelectedRow(rows[selectedRowIndex] || null);
  }, [rows, selectedRowIndex]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <KeyboardContext.Provider
      value={{ selectedRowIndex, selectedRow, setSelectedRowIndex }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};
