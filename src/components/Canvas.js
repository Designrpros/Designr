import React, { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import Section from './Section';
import { useAppState, useAppDispatch } from '../context/AppStateContext';

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;
  padding: 20px;
  margin-left: 300px; // Adjust or remove as needed to use full width
  width: calc(100% - 300px); // Adjust or change to 100% if full width is desired
  box-sizing: border-box;
  background-color: #f9f9f9;
`;


const Canvas = ({ setSelectedElement }) => {
  const { sections } = useAppState();
  const dispatch = useAppDispatch();

  const [, drop] = useDrop({
    accept: 'element',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      // Example action to add element to canvas at dropped position
      dispatch({
        type: 'ADD_ELEMENT_TO_CANVAS',
        payload: {
          type: item.type,
          content: item.content,
          styles: item.styles,
          left: clientOffset.x,
          top: clientOffset.y,
        },
      });
    },
  });

  useEffect(() => {
    console.log("Current state:", sections);
  }, [sections]);

  return (
    <CanvasContainer ref={drop}>
      {sections.map((section, index) => (
        <Section
          key={section.id}
          section={section}
          setSelectedElement={setSelectedElement}
        />
      ))}
    </CanvasContainer>
  );
};

export default Canvas;
