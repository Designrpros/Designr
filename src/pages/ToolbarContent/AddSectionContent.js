import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../context/AppContext'; // Adjust the import path as necessary

const ContentContainer = styled.div`
  padding: 20px;
  color: white;
`;

const GridOptionButton = styled.button`
  background: #4E4E4E;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%; 
  &:hover {
    background: #5C5C5C;
  }
`;

const AddSectionContent = () => {
  const dispatch = useAppDispatch();

  const handleShowGridSelection = () => {
    // Dispatching the action to toggle grid panel visibility
    dispatch({ type: 'TOGGLE_GRID_PANEL' });
  };

  return (
    <ContentContainer>
      <h2>Add Section</h2>
      <p>Click to select the grid layout for the new section:</p>
      <GridOptionButton onClick={handleShowGridSelection}>Select Grid Layout</GridOptionButton>
    </ContentContainer>
  );
};

export default AddSectionContent;
