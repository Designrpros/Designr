import React, { useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import Section from './Section';
import { ItemType } from './DraggableItem';
import { useAppState, useAppDispatch } from '../context/AppContext';

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;
  padding: 20px;
  margin-left: 300px;
  width: calc(100% - 300px);
  box-sizing: border-box;
  background-color: #f9f9f9;
`;

const determineDropTarget = (clientOffset, sectionsRefs) => {
  let targetSectionId = null;
  let targetColumnIndex = null;

  // Iterate through all section refs to find which section the drop occurred in
  Object.entries(sectionsRefs).forEach(([sectionId, sectionRef]) => {
    if (sectionRef && sectionRef.current) {
      const { top, bottom, left, right } = sectionRef.current.getBoundingClientRect();
      // Check if the drop position is within the current section
      if (
        clientOffset.x >= left &&
        clientOffset.x <= right &&
        clientOffset.y >= top &&
        clientOffset.y <= bottom
      ) {
        targetSectionId = sectionId;

        // Assuming each section knows its columns and their refs
        // This part needs to be adjusted based on your actual implementation
        const columnsRefs = sectionRef.current.columnsRefs || [];
        columnsRefs.forEach((columnRef, columnIndex) => {
          if (columnRef && columnRef.current) {
            const columnRect = columnRef.current.getBoundingClientRect();
            // Check if the drop position is within the current column
            if (
              clientOffset.x >= columnRect.left &&
              clientOffset.x <= columnRect.right
            ) {
              targetColumnIndex = columnIndex;
            }
          }
        });
      }
    }
  });

  return { sectionId: targetSectionId, columnIndex: targetColumnIndex };
};


const Canvas = ({ setSelectedElement }) => {
  const { sections } = useAppState();
  const dispatch = useAppDispatch();

  // Ref to store references to section DOM elements
  const sectionsRefs = useRef({});

  const [, drop] = useDrop({
    accept: 'element',
    drop: (item, monitor) => {
      const initialOffset = monitor.getInitialClientOffset();
      if (!initialOffset) {
        // Handle the case where initialOffset is null
        console.error('Drag operation not started correctly');
        return; // Exit the drop handler early
      }
      const delta = monitor.getDifferenceFromInitialOffset();
      // Ensure delta is not null; if it is, provide a fallback
      const left = Math.round((initialOffset.x + (delta?.x || 0)));
      const top = Math.round((initialOffset.y + (delta?.y || 0)));
  
      // Dispatch an action to add the dropped element to the canvas
      dispatch({
        type: 'ADD_ELEMENT_TO_CANVAS',
        payload: { ...item, left, top },
      });
    },
  });
  

  const onElementDrop = useCallback((item, sectionId, columnIndex) => {
    const { type } = item;

    if (type === 'heading') {
      // Update section state with h2 element in the grid
      dispatch({
        type: 'UPDATE_SECTION_WITH_ELEMENT',
        payload: { sectionId, columnIndex, heading: item.content || 'New Heading' },
      });
    } else if (type === 'image') {
      // Update section state with an image element
      dispatch({
        type: 'UPDATE_SECTION_WITH_ELEMENT',
        payload: { sectionId, columnIndex, image: item.src }, // Assuming "src" for image URL
      });
    } else {
      console.warn(`Unsupported element type for drop: ${type}`);
    }
  }, [dispatch]);

  
  

  return (
    <CanvasContainer ref={drop}>
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <Section
            key={section.id}
            id={section.id}
            columns={section.columns}
            columnWidths={section.columnWidths}
            setSelectedElement={setSelectedElement}
            onElementDrop={onElementDrop}
            // Pass ref to Section to store its DOM reference
            forwardRef={(el) => (sectionsRefs.current[section.id] = el)}
          />
        ))
      ) : (
        <div>No sections added yet.</div>
      )}
    </CanvasContainer>
  );
};

export default Canvas;
