import React from 'react';
import styled from 'styled-components';
import { useAppState, useAppDispatch } from '../context/AppStateContext';
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

const Sidebar = () => {
  const { activeTab, showGridPanel, selectedElement } = useAppState();
  const dispatch = useAppDispatch();

  // Function to handle adding sections
  const handleAddSection = (cols) => {
    dispatch({
      type: 'ADD_SECTION',
      payload: {
        id: Date.now(),
        columns: Array.from({ length: cols }, () => ({ elements: [] })),
        columnWidths: Array.from({ length: cols }, () => 200),
      },
    });
  };

  // Determine what content to display
  let content;
  if (activeTab === 'elementProperties' && selectedElement) {
    content = <ElementPropertiesForm element={selectedElement} />;
  } else {
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
      // Add more cases as needed
    }
  }

  return (
    <SidebarContainer>
      {content}
      {showGridPanel && <GridSelectionPanel onSelect={handleAddSection} />}
      {selectedElement && <ElementPropertiesForm element={selectedElement} />}

    </SidebarContainer>
  );
};


export default Sidebar;
