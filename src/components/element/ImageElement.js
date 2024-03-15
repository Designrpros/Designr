// ImageElement.js
import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  max-width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const ImageElement = ({ src, alt }) => {
  return <Image src={src} alt={alt || 'Image'} />;
};

export default ImageElement;
