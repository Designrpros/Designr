import React from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../context/AppContext';
import { elementStructure } from './elementStructure'; // Adjust this import based on actual location
import styled from 'styled-components';

const ElementPlaceholder = styled.div`
  border: 1px dashed #ddd;
  background-color: #f0f0f0;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;

const renderElement = (element) => {
  switch (element.type) {
    case 'heading':
      return <h2 style={{ textAlign: 'center', width: '100%' }}>{element.content}</h2>;
    case 'image':
      return <img src={element.src} alt="" style={{ maxWidth: '100%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />;
    default:
      return <div>Unsupported element type</div>;
  }
};

const Column = ({ sectionId, columnIndex, column, setSelectedElement }) => {
  const dispatch = useAppDispatch();
  
  const [, drop] = useDrop({
    accept: 'element',
    drop: (item) => {
      const newElement = {
        ...elementStructure,
        type: item.type,
        content: item.content || '',
      };

      dispatch({
        type: 'ADD_ELEMENT_TO_SECTION',
        payload: { sectionId, columnIndex, newElement },
      });
    },
  });

  return (
    <ElementPlaceholder ref={drop}>
      {column.elements.map((element, index) => (
        <div key={index} onClick={() => setSelectedElement(element)}>
          {renderElement(element)}
        </div>
      ))}
    </ElementPlaceholder>
  );
};

export default Column;
