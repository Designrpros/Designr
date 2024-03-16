// Section.js
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

const Section = ({ section }) => {
  return (
    <SectionContainer>
      {section.columns.map((column) => (
        <Column
          key={column.id} // Using column.id as the key
          column={column}
        />
      ))}
    </SectionContainer>
  );
};

export default Section;
