import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../context/AppStateContext'; // Adjust the import path as necessary
import GridSelectionPanel from '../../components/GridSelectionPanel'; // Adjust the import path as necessary

const ContentContainer = styled.div`
  padding: 20px;
  color: white;
`;

const Button = styled.button`
  background: #4E4E4E;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px; // Added margin for spacing
  width: 100%;
  &:hover {
    background: #5C5C5C;
  }
`;

const AddSectionContent = () => {
  const dispatch = useAppDispatch();
  const [showGridSelection, setShowGridSelection] = useState(false);

  const handleAddSection = (columns) => {
    // Assuming an action creator exists that accepts the number of columns for the new section
    dispatch({
      type: 'ADD_SECTION_WITH_COLUMNS',
      payload: { columns },
    });
    setShowGridSelection(false); // Hide grid selection after adding
  };

  return (
    <ContentContainer>
      <h2>Add Section</h2>
      {!showGridSelection ? (
        <>
          <p>Click to select the grid layout for the new section:</p>
          <Button onClick={() => setShowGridSelection(true)}>Select Grid Layout</Button>
        </>
      ) : (
        <GridSelectionPanel onSelect={handleAddSection} />
      )}
    </ContentContainer>
  );
};

export default AddSectionContent;
