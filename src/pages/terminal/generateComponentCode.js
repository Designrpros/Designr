// A simplified example to generate a React component code as a string
export const generateComponentCode = (section) => {
  if (!section || !section.elements) {
      console.error('Section or section.elements is undefined');
      return ''; // Return an empty string or some default code
  }

  let componentCode = `import React from 'react';\n\n`;

  componentCode += `const Section = () => (\n`;
  componentCode += `  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(${section.layout}, 1fr)', gap: '10px' }}>\n`;

  section.elements.forEach((el) => {
      switch (el.type) {
          case 'heading':
              componentCode += `    <h2>${el.content}</h2>\n`;
              break;
          case 'image':
              componentCode += `    <img src="${el.src}" alt="Image" />\n`;
              break;
          // Add more cases for other element types
      }
  });

  componentCode += `  </div>\n`;
  componentCode += `);\n\n`;
  componentCode += `export default Section;`;

  return componentCode;
};