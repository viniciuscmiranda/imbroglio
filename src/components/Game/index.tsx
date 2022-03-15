import { Actions } from 'components/Actions';
import { Title } from 'components/Title';
import { Toasts } from 'components/Toasts';
import { MAX_LETTERS, UNUSED_DROPPABLE_ID, UNUSED_ROW_LENGTH } from 'constants';
import { useGame } from 'hooks';
import _ from 'lodash';
import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import {
  BenchContainer,
  BenchLettersContainer,
  GameContainer,
  LastSolution,
  LetterContainer,
  RowContainer,
  RowsContainer,
} from './styles';

export const Game: React.FC = () => {
  const {
    rows,
    letters,
    correctRows,
    getSpecialCharactersRow,
    dropLetter,
    lastSolution,
  } = useGame();

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
      <Title />

      <Actions />

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Rows */}
        <RowsContainer>
          {rows.map((row, rowIndex) => {
            const originalRow = getSpecialCharactersRow(row, rowIndex);

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

        {/* Last Solution */}
        {lastSolution && (
          <LastSolution>
            Solução de ontem:
            <span> {lastSolution.map(_.capitalize).join(', ')}</span>
          </LastSolution>
        )}

        {/* Bench */}
        <BenchContainer>
          {_.chunk(letters, UNUSED_ROW_LENGTH).map((row, rowIndex) => (
            <Droppable
              key={rowIndex}
              droppableId={`${UNUSED_DROPPABLE_ID}-${rowIndex}`}
              isDropDisabled={letters.length >= MAX_LETTERS}
              direction="horizontal"
            >
              {(provided) => (
                <BenchLettersContainer
                  disabled={!row.length}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {row.map((letter, index) => (
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
                </BenchLettersContainer>
              )}
            </Droppable>
          ))}

          <Toasts />
        </BenchContainer>
      </DragDropContext>
    </GameContainer>
  );
};
