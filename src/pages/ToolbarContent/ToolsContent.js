import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { tools as importedTools } from '../../components/elementStructure';

const ContentContainer = styled.div`
  padding: 20px;
  color: white;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); // Adjust minmax values as needed
  gap: 10px;
  text-align: center;
`;


const Tool = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #4E4E4E;
  cursor: grab;
  padding: 10px;
  box-sizing: border-box;
`;

const DraggableElement = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element', // Make sure this matches the accept type in useDrop
    item: { ...item }, // Spread the item props to ensure all data is passed
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Tool ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <i className="material-icons" style={{ fontSize: '24px' }}>{item.icon}</i>
      <p>{item.label}</p>
    </Tool>
  );
};



const ToolsContent = ({ tools = importedTools }) => {
  console.log(tools); // Debug: Log tools to ensure they're passed correctly

  return (
    <ContentContainer>
      <h2>Tools</h2>
      <ToolsGrid>
        {tools.length > 0 ? (
          tools.map((tool) => ( // Use tool.id as key
            <DraggableElement key={tool.id} item={tool} />
          ))
        ) : (
          <div>No tools found</div>
        )}
      </ToolsGrid>
    </ContentContainer>
  );
};



export default ToolsContent;
