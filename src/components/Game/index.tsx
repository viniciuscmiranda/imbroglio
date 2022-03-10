import { MAX_LETTERS, UNUSED_DROPPABLE_ID, UNUSED_ROW_LENGTH } from 'constants';
import { useGame } from 'hooks';
import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import {
  GameContainer,
  GameTitle,
  LetterContainer,
  LettersContainer,
  RowContainer,
  RowsContainer,
  UnusedContainer,
} from './styles';

export const Game: React.FC = () => {
  const { rows, letters, correctRows, getOriginalRow, dropLetter } = useGame();

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const prevIndex = result.source.index;
    const nextIndex = result.destination.index;

    const fromUnused = result.source.droppableId.includes(UNUSED_DROPPABLE_ID);
    const toUnused = result.destination.droppableId.includes(UNUSED_DROPPABLE_ID);

    if (toUnused && fromUnused) {
      dropLetter({
        letter: letters[prevIndex],
        index: prevIndex,
        nextIndex,
      });
    } else if (toUnused) {
      const prevRowIndex = Number(result.source.droppableId);

      dropLetter({
        letter: rows[prevRowIndex][prevIndex],
        index: prevIndex,
        nextIndex,
        rowIndex: prevRowIndex,
      });
    } else if (fromUnused) {
      const nextRowIndex = Number(result.destination.droppableId);

      dropLetter({
        letter: letters[prevIndex],
        index: prevIndex,
        nextIndex,
        nextRowIndex,
      });
    } else {
      const prevRowIndex = Number(result.source.droppableId);
      const nextRowIndex = Number(result.destination.droppableId);

      dropLetter({
        letter: rows[prevRowIndex][prevIndex],
        index: prevIndex,
        nextIndex,
        rowIndex: prevRowIndex,
        nextRowIndex,
      });
    }
  }

  return (
    <GameContainer>
      <GameTitle>imbroglio</GameTitle>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Rows */}
        <RowsContainer>
          {rows.map((row, rowIndex) => {
            const originalRow = getOriginalRow(row, rowIndex);

            return (
              <Droppable
                key={rowIndex}
                droppableId={String(rowIndex)}
                direction="horizontal"
              >
                {(provided) => (
                  <RowContainer ref={provided.innerRef} {...provided.droppableProps}>
                    {originalRow.map((letter, index) => (
                      <Draggable key={letter.id} draggableId={letter.id} index={index}>
                        {(provided) => (
                          <LetterContainer
                            ref={provided.innerRef}
                            correct={correctRows.includes(rowIndex)}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {letter.content}
                          </LetterContainer>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </RowContainer>
                )}
              </Droppable>
            );
          })}
        </RowsContainer>

        {/* Unused */}
        <UnusedContainer>
          {Array.from({ length: MAX_LETTERS / UNUSED_ROW_LENGTH }).map(
            (_row, rowIndex) => (
              <Droppable
                key={rowIndex}
                droppableId={`${UNUSED_DROPPABLE_ID}-${rowIndex}`}
                isDropDisabled={letters.length >= MAX_LETTERS}
                direction="horizontal"
              >
                {(provided) => {
                  const rowLetters = letters.slice(
                    rowIndex * UNUSED_ROW_LENGTH,
                    rowIndex * UNUSED_ROW_LENGTH + UNUSED_ROW_LENGTH,
                  );

                  return (
                    <LettersContainer
                      disabled={!rowLetters.length}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {rowLetters.map((letter, index) => (
                        <Draggable
                          key={letter.id}
                          draggableId={letter.id}
                          index={index + rowIndex * UNUSED_ROW_LENGTH}
                        >
                          {(provided) => (
                            <LetterContainer
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {letter.content}
                            </LetterContainer>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </LettersContainer>
                  );
                }}
              </Droppable>
            ),
          )}
        </UnusedContainer>
      </DragDropContext>
    </GameContainer>
  );
};
