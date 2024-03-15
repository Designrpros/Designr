import React from 'react';
import styled from 'styled-components';

const DynamicHeading = styled(({ tag, ...props }) => React.createElement(tag, props))`
  text-align: ${({ styles }) => styles?.textAlign || 'left'};
  color: ${({ styles }) => styles?.color || '#000'};
  font-size: ${({ styles }) => styles?.fontSize || '16px'};
  font-weight: ${({ styles }) => styles?.fontWeight || 'normal'};
  text-shadow: ${({ styles }) => styles?.textShadow || 'none'};
`;

const HeadingElement = ({ content, styles = {} }) => {
  // Provide a default value for htmlTag if not specified
  const htmlTag = styles.htmlTag || 'h2';
  return <DynamicHeading tag={htmlTag} styles={styles}>{content}</DynamicHeading>;
};

export default HeadingElement;
