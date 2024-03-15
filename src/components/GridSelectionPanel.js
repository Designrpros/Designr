// GridSelectionPanel.js
import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr)); // Adjust based on minimum grid option size
  gap: 10px; // Adjust spacing between grid options
  padding: 20px;
  justify-content: center;
`;

const GridOption = styled.div`
  border: 2px dashed #ccc;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  aspect-ratio: 1; // Makes the grid option squares
  &:hover {
    border-style: solid;
    border-color: #aaa;
  }
`;

const GridSelectionPanel = ({ onSelect }) => {
  return (
    <PanelContainer>
      {[1, 2, 3, 4].map((cols) => (
        <GridOption key={cols} onClick={() => {
          console.log(`Grid option ${cols} clicked`);
          onSelect(cols);
        }}>
          {`${cols} Columns`}
        </GridOption>
      ))}
    </PanelContainer>
  );
};

export default GridSelectionPanel;
