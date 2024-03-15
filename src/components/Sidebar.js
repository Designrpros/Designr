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
  console.log('Active Tab:', activeTab, 'Selected Element:', selectedElement); // Add this line

  const dispatch = useAppDispatch();

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

  let content;
  if (selectedElement) {
    // Always give priority to editing an element if one is selected
    content = <ElementPropertiesForm element={selectedElement} />;
  } else {
    // Handle tab navigation only if no element is currently selected
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
      default:
        content = <div>Select a tab</div>;
    }
  }

  return (
    <SidebarContainer>
      {content}
      {showGridPanel && <GridSelectionPanel onSelect={handleAddSection} />}
    </SidebarContainer>
  );
};

export default Sidebar;
