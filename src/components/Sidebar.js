import React from 'react';
import styled from 'styled-components';
import { useAppState, useAppDispatch } from '../context/AppContext';
import PageManager from '../pages/ToolbarContent/PageManager';
import AddSectionContent from '../pages/ToolbarContent/AddSectionContent';
import GridSelectionPanel from './GridSelectionPanel';
import ElementPropertiesForm from './ElementPropertiesForm';
import ToolsContent from '../pages/ToolbarContent/ToolsContent';

const SidebarContainer = styled.div`
  background: #333;
  overflow-y: auto;
  position: fixed;
  left: 50px;
  top: 0;
  bottom: 0;
  width: 250px;
  z-index: 100;
`;

const Sidebar = ({ selectedElement, updateElement }) => {
  const { activeTab, showGridPanel } = useAppState();
  const dispatch = useAppDispatch();

  const handleAddSection = (cols) => {
    // Dispatch the action to add a new section
    dispatch({
      type: 'ADD_SECTION',
      payload: {
        id: Date.now(),
        columns: Array.from({ length: cols }, () => ({ elements: [] })),
        columnWidths: Array.from({ length: cols }, () => 200), // Assuming a default width of 200 for each column
        elements: []
      }
    });
    // Immediately close the GridSelectionPanel after adding the section
    dispatch({ type: 'TOGGLE_GRID_PANEL' });
  };
  

  

  let content;
  switch (activeTab) {
    case 'pageManager':
      content = <PageManager />;
      break;
    case 'addSection':
      content = <AddSectionContent onShowGridSelection={() => dispatch({ type: 'TOGGLE_GRID_PANEL' })} />;
      break;
    case 'tools':
      content = <ToolsContent />;
      break;
    case 'elementProperties':
      content = selectedElement ? <ElementPropertiesForm element={selectedElement} updateElement={updateElement} /> : <div>No element selected</div>;
      break;
  }

  return (
    <SidebarContainer>
      {content}
      {showGridPanel && <GridSelectionPanel onSelect={handleAddSection} />}
    </SidebarContainer>
  );
};

export default Sidebar;
