import { Actions } from 'components/Actions';
import { Meaning } from 'components/Meaning';
import { Title } from 'components/Title';
import { Toasts } from 'components/Toasts';
import { BENCH_DROPPABLE_ID, BENCH_ROW_LENGTH, MAX_LETTERS } from 'constants';
import { useGame, useKeyboard } from 'hooks';
import _ from 'lodash';
import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import {
  Bench,
  BenchRow,
  Board,
  GameContainer,
  LastSolution,
  Letter,
  Row,
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

  const { selectedRowIndex, setSelectedRowIndex } = useKeyboard();

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const prevIndex = result.source.index;
    const nextIndex = result.destination.index;

    const fromBench = result.source.droppableId.includes(BENCH_DROPPABLE_ID);
    const toBench = result.destination.droppableId.includes(BENCH_DROPPABLE_ID);

    if (toBench && fromBench) {
      dropLetter({
        letter: letters[prevIndex],
        index: prevIndex,
        nextIndex,
      });
    } else if (toBench) {
      const prevRowIndex = Number(result.source.droppableId);

      dropLetter({
        letter: rows[prevRowIndex][prevIndex],
        index: prevIndex,
        nextIndex,
        rowIndex: prevRowIndex,
      });
    } else if (fromBench) {
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
        <Board>
          {rows.map((row, rowIndex) => {
            const originalRow = getSpecialCharactersRow(row, rowIndex);

            return (
              <Droppable
                key={rowIndex}
                droppableId={String(rowIndex)}
                direction="horizontal"
              >
                {(provided) => (
                  <Row
                    selected={selectedRowIndex === rowIndex}
                    onClick={() => setSelectedRowIndex(rowIndex)}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {correctRows.includes(rowIndex) && (
                      <Meaning
                        word={originalRow.map(({ content }) => content).join('')}
                      />
                    )}

                    {originalRow.map((letter, index) => (
                      <Draggable key={letter.id} draggableId={letter.id} index={index}>
                        {(provided) => (
                          <Letter
                            ref={provided.innerRef}
                            correct={correctRows.includes(rowIndex)}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {letter.content}
                          </Letter>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </Row>
                )}
              </Droppable>
            );
          })}
        </Board>

        {/* Last Solution */}
        {lastSolution && (
          <LastSolution>
            Solução de ontem:
            <span> {lastSolution.map(_.capitalize).join(', ')}</span>
          </LastSolution>
        )}

        {/* Bench */}
        <Bench>
          {_.chunk(letters, BENCH_ROW_LENGTH).map((row, rowIndex) => (
            <Droppable
              key={rowIndex}
              droppableId={`${BENCH_DROPPABLE_ID}-${rowIndex}`}
              isDropDisabled={letters.length >= MAX_LETTERS}
              direction="horizontal"
            >
              {(provided) => (
                <BenchRow
                  disabled={!row.length}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {row.map((letter, index) => (
                    <Draggable
                      key={letter.id}
                      draggableId={letter.id}
                      index={index + rowIndex * BENCH_ROW_LENGTH}
                    >
                      {(provided) => (
                        <Letter
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {letter.content}
                        </Letter>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </BenchRow>
              )}
            </Droppable>
          ))}

          <Toasts />
        </Bench>
      </DragDropContext>
    </GameContainer>
  );
};
