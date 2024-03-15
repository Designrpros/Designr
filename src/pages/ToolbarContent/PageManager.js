import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from '../../components/DraggableItem'; // Update the path as necessary
import { FaFolder, FaFile, FaPlus } from 'react-icons/fa';

const ManagerContainer = styled.div`
  padding: 20px;
  position: fixed; // Positioned relative to the vertical toolbar
  left: 50px; // Adjust based on your toolbar width
  top: 0;
  bottom: 0;
  width: 300px; // Adjust as needed
  overflow-y: auto;
`;

const Button = styled.button`
  display: block;
  margin: 10px 0;
`;

const Item = styled.div`
  margin: 5px 0;
  padding-left: ${props => props.level * 20}px; // Indent based on hierarchy level
  display: flex;
  align-items: center;
  gap: 10px;
`;

function PageManager({ onAddPage, onAddFolder }) {

  const handleAddPage = () => {
    const name = prompt('Page name:');
    if (name) {
      const newItem = { id: Date.now(), name, type: 'page', level: 0 };
      setItems([...items, newItem]);
      onAddPage(newItem); // Propagate the new page up if needed
    }
  };

  const handleAddFolder = () => {
    const name = prompt('Folder name:');
    if (name) {
      const newItem = { id: Date.now(), name, type: 'folder', level: 0 };
      setItems([...items, newItem]);
      onAddFolder(newItem); // Propagate the new folder up if needed
    }
  };

  const [items, setItems] = useState([
    { id: 'folder1', name: 'Folder 1', type: 'folder', level: 0, children: [] },
    // More folders and pages
  ]);

  const handleDrop = (draggedItem, targetItem) => {
    if (draggedItem.type === 'page' && targetItem.type === 'folder') {
      // Logic to add the dragged page to the target folder's children
      setItems(prevItems => {
        const newItems = prevItems.map(item => {
          if (item.id === targetItem.id) {
            return { ...item, children: [...item.children, draggedItem] };
          }
          return item;
        });
        return newItems;
      });
    }
  };
  
  const renderItems = (items, level = 0) => {
    return items.map(item => (
      <Draggable key={item.id} item={{ ...item, level }} onDrop={handleDrop}>
        {item.type === 'folder' ? (
          <>
            {item.name}
            {renderItems(item.children, level + 1)} {/* Recursive rendering for nested structure */}
          </>
        ) : (
          item.name
        )}
      </Draggable>
    ));
  };
  
  

  return (
    <ManagerContainer>
      <Button onClick={handleAddPage}>Add Page</Button>
      <Button onClick={handleAddFolder}>Add Folder</Button>
      {renderItems(items)}
    </ManagerContainer>
  );  
}

export default PageManager;
