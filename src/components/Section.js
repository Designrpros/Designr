import React from 'react';
import styled from 'styled-components';
import Column from './Column';

const SectionContainer = styled.div`
  display: grid;
  gap: 10px;
  padding: 10px;
  width: 100%;
  min-height: 100px;
`;

const Section = ({ id, columns, columnWidths, setSelectedElement, onElementDrop }) => {
  console.log('Rendering section:', id, columns, columnWidths); // Log section data

  const gridTemplateColumns = columnWidths.map(width => `minmax(${width}px, 1fr)`).join(' ');

  return (
    <SectionContainer style={{ gridTemplateColumns }}>
      {columns && columns.map((column, idx) => (
        <Column
        key={idx}
        sectionId={id}
        columnIndex={idx}
        column={column}
        onElementDrop={onElementDrop}
        setSelectedElement={setSelectedElement} // Make sure this prop is passed
      />
      
      ))}
    </SectionContainer>
  );
};

export default Section;
