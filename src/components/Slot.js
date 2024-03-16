import React from 'react';
import { useDrop } from 'react-dnd';
import styled, { css } from 'styled-components';
import { useAppDispatch } from '../context/AppStateContext';

const SlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  flex: 1; /* Adjust if necessary for your design */
  min-height: 20px;
  background-color: ${props => props.expanded ? '#e0e0e0' : 'transparent'};
  transition: all 0.3s ease;
`;





const Slot = ({ slot, expanded, onDrop }) => {
    const dispatch = useAppDispatch();

    const [, drop] = useDrop({
        accept: 'element',
        drop: (item, monitor) => {
          // When an item is dropped, invoke the onDrop callback if provided
          if (onDrop) {
            onDrop(item);
          }

          // Dispatch an action to add the item to this slot
          dispatch({
            type: 'ADD_ELEMENT_TO_SLOT',
            payload: { slotId: slot.id, item: item },
          });
        },
    });

    return (
      <SlotContainer ref={drop} expanded={expanded}>
        {slot.elements && slot.elements.map((element, index) => (
          <div key={index}>{element.content}</div>
        ))}
      </SlotContainer>
    );
};


export default Slot;
