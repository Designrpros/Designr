// HeadingElement.js
import React from 'react';
import styled from 'styled-components';

const Heading = styled.h2`
  text-align: center;
  width: 100%;
`;

const HeadingElement = ({ content }) => {
  return <Heading>{content}</Heading>;
};

export default HeadingElement;

