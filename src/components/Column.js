import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../context/AppStateContext'; // Ensure this path is correct
import { elementStructure } from './elementStructure';
import { ResizableBox } from 'react-resizable';
import HeadingElement from './element/HeadingElement';
import ImageElement from './element/ImageElement';
import styled from 'styled-components';

const ElementPlaceholder = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  grid-gap: 20px;
  align-items: center;
  justify-items: center;
  text-align: center;
  min-height: 100px;
  border: 1px dashed #ddd;
  background-color: #f0f0f0;
  cursor: pointer;
`;

const renderResizableElement = (element, onResize) => {
  // Directly handle each element type here
  switch (element.type) {
    case 'heading':
      return (
        <ResizableBox
          width={element.size?.width || 200} // Use element's size if available
          height={element.size?.height || 100} // Adjust height as needed
          handleSize={[8, 8]}
          onResizeStop={(e, data) => onResize(element.id, data.size)}
        >
          <HeadingElement content={element.content} />
        </ResizableBox>
      );
    case 'image':
      return (
        <ResizableBox
          width={element.size?.width || 200}
          height={element.size?.height || 200}
          handleSize={[8, 8]}
          onResizeStop={(e, data) => onResize(element.id, data.size)}
        >
          <ImageElement src={element.src} alt="" />
        </ResizableBox>
      );
    default:
      return <div>Unsupported element type</div>;
  }
};

function determineDropPosition(clientOffset, columnRef) {
  if (!columnRef.current || !clientOffset) return { vertical: 'bottom', horizontal: 'center' };
  const { top, bottom, left, right } = columnRef.current.getBoundingClientRect();
  const middleY = (top + bottom) / 2;
  const middleX = (left + right) / 2;
  return { vertical: clientOffset.y <= middleY ? 'top' : 'bottom', horizontal: clientOffset.x <= middleX ? 'left' : 'right' };
}

const Column = ({ sectionId, columnIndex, column, setSelectedElement }) => {
  const [hoverPosition, setHoverPosition] = useState(null);
  const dispatch = useAppDispatch();
  const columnRef = useRef(null);

  const [, drop] = useDrop({
    accept: 'element',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const { vertical, horizontal } = determineDropPosition(clientOffset, columnRef);
      const newElement = { ...elementStructure, type: item.type, content: item.content || '', position: { vertical, horizontal } };
      dispatch({ type: 'ADD_ELEMENT_TO_SECTION', payload: { sectionId, columnIndex, newElement } });
    },
    hover: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const hoverPosition = determineDropPosition(clientOffset, columnRef);
      setHoverPosition(hoverPosition); // Update hover position state
    },
  });

  const handleElementClick = (elementDetails) => {
    dispatch({
      type: 'SELECT_ELEMENT',
      payload: elementDetails,
    });
  };
  
  
  
  drop(columnRef);

  return (
    <ElementPlaceholder ref={columnRef}>
      {column.elements.map((element, index) => (
        <div key={index} onClick={() => handleElementClick({ ...element, sectionId, columnIndex, elementIndex: index })}>
            {renderResizableElement(element, (elementId, newSize) => {
            dispatch({
                type: 'UPDATE_ELEMENT_SIZE',
                payload: { sectionId, columnIndex, elementId, newSize },
              });
          })}
        </div>
      ))}
    </ElementPlaceholder>
  );
};
export default Column;
