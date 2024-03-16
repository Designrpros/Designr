// Column.js
import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../context/AppStateContext';
import Slot from './Slot';
import styled from 'styled-components';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  border: 1px solid #ddd;
  width: 100%;
  flex: 1;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  flex: 1;
`;

const Column = React.forwardRef(({ sectionId, column }, ref) => {
  const dispatch = useAppDispatch();
  // Assuming each slot in column.slots already has a unique id
  const [expandedSlots, setExpandedSlots] = useState(new Array(column.slots.length).fill(false));
  console.log("Column slots:", column.slots);
  const [, drop] = useDrop({
    accept: 'element',
    // Drop handling logic...
  });

  drop(ref);

  const renderRows = () => {
    const rows = [];
    // Assuming there are always 9 slots for a 3x3 grid
    for (let i = 0; i < 3; i++) { // Create 3 rows
      const slotsInRow = column.slots.slice(i * 3, (i + 1) * 3);
      const row = (
        <RowContainer key={`row-${i}`}>
          {slotsInRow.map((slot) => (
            <Slot
              key={slot.id} // Using unique slot.id for key
              slot={slot}
              expanded={expandedSlots[slot.id]} // Adjusted to use slot.id for tracking expanded state
              onDrop={() => {}}
            />
          ))}
        </RowContainer>
      );
      rows.push(row);
    }
    return rows;
  };

  return <ColumnContainer ref={ref}>{renderRows()}</ColumnContainer>;
});

export default Column;
