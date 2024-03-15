// ElementPropertiesForm.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../context/AppStateContext'; // Adjust the import path as necessary

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: black;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4E4E4E;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #5C5C5C;
  }
`;

const ElementPropertiesForm = ({ element, sectionId, columnIndex, elementIndex }) => {
  console.log(element); // Check if the element prop is what you expect
  const [content, setContent] = useState(element.content || '');
  const dispatch = useAppDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_ELEMENT_PROPERTIES',
      payload: {
        ...element, // Spread the existing element details
        content, // Update with new content
      },
    });
  };
  

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>Edit Element</h3>
      <Label htmlFor="content">Content:</Label>
      <Input
        id="content"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit">Update Element</Button>
    </FormContainer>
  );
};

export default ElementPropertiesForm;
