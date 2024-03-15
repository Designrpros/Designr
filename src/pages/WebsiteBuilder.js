import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Canvas from '../components/Canvas';
import VerticalToolbar from './VerticalToolbar';
import GridSelectionPanel from '../components/GridSelectionPanel';
import Terminal from './terminal/Terminal';
import { loadWebsiteConfigFromLocalStorage, saveWebsiteConfigToLocalStorage } from './configUtils';

const BuilderLayout = styled.div`
  display: flex;
  height: 100vh;
  overflow: auto;
`;

const WebsiteBuilder = () => {
  const { websiteId } = useParams();
  const [sections, setSections] = useState([]);
  const [showGridPanel, setShowGridPanel] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalContent, setTerminalContent] = useState('');

  useEffect(() => {
    const loadWebsiteConfig = () => {
      try {
        const storedConfig = localStorage.getItem(`websiteConfig_${websiteId}`);
        if (storedConfig) {
          const config = JSON.parse(storedConfig);
          setSections(config.sections || []); // Ensure fallback to an empty array if no sections
        } else {
          console.warn("No website configuration found in local storage. Initializing with defaults.");
        }
      } catch (error) {
        console.error("Failed to load website configuration from local storage:", error);
      }
    };

    if (websiteId) {
      loadWebsiteConfig();
    }
  }, [websiteId]);

  const handleSaveConfig = (updatedSections) => {
    const currentConfig = { sections: updatedSections };
    saveWebsiteConfigToLocalStorage(websiteId, currentConfig);
  };

  const handleToggleContent = (tab) => {
    setShowGridPanel(false);
    // Additional logic for toggling content based on the tab parameter can be added here
  };

  const handleAddSection = (layout) => {
    const newSection = {
      id: Date.now(),
      columns: layout,
      columnWidths: Array(layout).fill(200), // Assuming 'layout' is the number of columns
      elements: [],
    };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    handleSaveConfig(updatedSections);
    setShowGridPanel(false);
  };

  const handleShowGridSelection = () => {
    setShowGridPanel(!showGridPanel);
  };

  const updateElementFunction = (updatedElement) => {
    // Logic to update an element within a section
    // This function needs to be implemented based on how you plan to update elements
  };

  return (
    <BuilderLayout>
      <VerticalToolbar
        onToggleContent={handleToggleContent}
        setShowTerminal={setShowTerminal}
        setTerminalContent={setTerminalContent}
      />
      <Sidebar
        selectedElement={selectedElement}
        updateElement={updateElementFunction}
        onShowGridSelection={handleShowGridSelection}
        setSections={setSections}
      />
      {showGridPanel && <GridSelectionPanel onSelect={handleAddSection} />}
      <Canvas sections={sections} setSelectedElement={setSelectedElement} />
      {showTerminal && <Terminal code={terminalContent} />}
    </BuilderLayout>
  );
};

export default WebsiteBuilder;
