import React from 'react';
import styled from 'styled-components';
import Column from './Column';

const SectionContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 20px;
padding: 10px;
border: 1px solid #ccc;
`;





const Section = ({ section, setSelectedElement }) => {
  return (
    <SectionContainer>
      {section.columns.map((column, index) => (
        <Column
          key={column.id}
          column={column}
          setSelectedElement={setSelectedElement}
        />
      ))}
    </SectionContainer>
  );
};

export default Section;
