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


const HeadingElement = ({ elementId }) => {
    const { sections } = useAppState();
    
    console.log("Received elementId:", elementId); // Debugging line

    const element = sections.flatMap(section => section.columns.flatMap(column => column.elements))
                             .find(el => el.id === elementId);

    console.log("Found element:", element); // Debugging line

    const styles = element ? element.styles : {};
    const content = element ? element.content : 'Default Content';

    const htmlTag = styles.htmlTag || 'h2';
    return (
        <DynamicHeading
            tag={htmlTag}
            textAlign={styles.textAlign}
            color={styles.color}
            fontSize={styles.fontSize}
            fontWeight={styles.fontWeight}
            textShadow={styles.textShadow}
        >
            {content}
        </DynamicHeading>
    );
};



export default HeadingElement;
