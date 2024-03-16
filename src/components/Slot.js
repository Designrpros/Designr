import React from 'react';
import { useDrop } from 'react-dnd';
import styled, { css } from 'styled-components';
import { useAppDispatch } from '../context/AppStateContext';
import { v4 as uuidv4 } from 'uuid'; // Ensure you've installed uuid

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
          // Create a new element instance from the dropped tool
          const newElement = {
            ...item,
            id: uuidv4(), // Assuming you're using uuid for unique IDs
            styles: item.styles || { textAlign: 'left', color: '#000', fontSize: '16px', fontWeight: 'normal', textShadow: 'none' },
          };
          

          // Dispatch an action to add the new element to this slot and expand it
          dispatch({
            type: 'ADD_ELEMENT_TO_SLOT_AND_EXPAND',
            payload: {
              slotId: slot.id,
              item: newElement,
            },
          });          
        },
    });

    const handleElementClick = (element) => {
      dispatch({
        type: 'SELECT_ELEMENT',
        payload: element,
      });
    };

    return (
      <SlotContainer ref={drop} expanded={expanded}>
        {slot && slot.elements && slot.elements.map((element, index) => (
          <div key={index} onClick={() => handleElementClick(element)} style={{ cursor: 'pointer' }}>
            {element.content}
          </div>
        ))}
      </SlotContainer>
    );
};




export default Slot;
