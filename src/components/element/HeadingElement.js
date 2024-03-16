import React from 'react';
import styled from 'styled-components';
import { useAppState } from '../../context/AppStateContext'; // Adjust the path as necessary

const DynamicHeading = styled(({ tag, textAlign, color, fontSize, fontWeight, textShadow, ...props }) => React.createElement(tag, props))`
  text-align: ${props => props.textAlign || 'center'};
  color: ${props => props.color || '#000'};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'normal'};
  text-shadow: ${props => props.textShadow || 'none'};
`;

// Adjusted to remove absolute positioning
const HeadingContainer = styled.div`
  margin: 5px 0; // Example of adding some spacing between elements
`;

const HeadingElement = ({ elementId }) => {
    const { sections } = useAppState();
    const element = sections.flatMap(section => section.columns.flatMap(column => column.elements)).find(el => el.id === elementId);
    const { styles, content } = element || { styles: {}, content: 'Default Content' };
  
    return (
        <HeadingContainer>
          <DynamicHeading
            tag={styles.htmlTag || 'h2'}
            style={{ ...styles }}
          >
            {content}
          </DynamicHeading>
        </HeadingContainer>
      );
};

export default HeadingElement;
