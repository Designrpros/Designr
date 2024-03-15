import React from 'react';
import { useDrag } from 'react-dnd';
import { FaFolder, FaFile } from 'react-icons/fa';
import styled from 'styled-components';

export const ItemType = {
  TOOL: 'tool',
  ELEMENT: 'element',
  PAGE: 'page',
  FOLDER: 'folder',
};

const Item = styled.div`
  margin: 5px 0;
  padding-left: ${props => props.level * 20}px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  opacity: ${props => (props.$isDragging ? 0.5 : 1)}; // Use transient prop $isDragging
`;

const DraggableItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TOOL, // Use the common ItemType here
    item: { id: item.id, type: item.type }, // Include the specific type if needed
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [item]);

  // Determine the icon based on the item type
  const icon = item.type === ItemType.FOLDER ? <FaFolder /> : <FaFile />;

  return (
    <Item ref={drag} level={item.level} $isDragging={isDragging}>
      {icon}
      {item.name}
    </Item>
  );
};

export default DraggableItem;
