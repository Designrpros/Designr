import React, { createContext, useContext, useState } from 'react';

const EditorContext = createContext();

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const value = {
    sections,
    setSections,
    selectedElement,
    setSelectedElement,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};
