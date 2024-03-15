import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Canvas from '../components/Canvas';
import VerticalToolbar from './VerticalToolbar';
import GridSelectionPanel from '../components/GridSelectionPanel';
import Terminal from './terminal/Terminal';
import { saveWebsiteConfigToLocalStorage } from './configUtils';

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
          setSections(config.sections || []);
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
    saveWebsiteConfigToLocalStorage(websiteId, { sections: updatedSections });
  };

  const handleAddSection = (layout) => {
    const newSection = {
      id: Date.now(),
      columns: layout,
      columnWidths: Array(layout).fill(200),
      elements: [],
    };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    handleSaveConfig(updatedSections);
    setShowGridPanel(false);
  };

  const updateElement = (updatedElement) => {
    const updatedSections = sections.map(section => {
      return {
        ...section,
        elements: section.elements.map(element => {
          if (element.id === updatedElement.id) {
            return updatedElement;
          }
          return element;
        }),
      };
    });
    setSections(updatedSections);
    handleSaveConfig(updatedSections);
  };

  return (
    <BuilderLayout>
      <VerticalToolbar onToggleContent={() => setShowGridPanel(!showGridPanel)} setShowTerminal={setShowTerminal} setTerminalContent={setTerminalContent} />
      <Sidebar selectedElement={selectedElement} updateElement={updateElement} onShowGridSelection={() => setShowGridPanel(!showGridPanel)} />
      {showGridPanel && <GridSelectionPanel onSelect={handleAddSection} />}
      <Canvas sections={sections} setSelectedElement={setSelectedElement} />
      {showTerminal && <Terminal code={terminalContent} />}
    </BuilderLayout>
  );
};

export default WebsiteBuilder;
