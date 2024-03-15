import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../context/AppStateContext';
import { SketchPicker } from 'react-color';

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

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 0;
  margin: 0 5px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ElementPropertiesForm = ({ element }) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState(element.content);
  const [textAlign, setTextAlign] = useState(element.styles.textAlign);
  const [color, setColor] = useState(element.styles.color);
  const [fontSize, setFontSize] = useState(element.styles.fontSize);

  const handleUpdate = () => {
    dispatch({
      type: 'UPDATE_ELEMENT_CONTENT_AND_STYLES',
      payload: { id: element.id, content, styles: { textAlign, color, fontSize } },
    });
  };

  return (
    <FormContainer>
      <Label htmlFor="content">Content:</Label>
      <Input
        id="content"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Label htmlFor="textAlign">Text Align:</Label>
      <Select id="textAlign" value={textAlign} onChange={(e) => setTextAlign(e.target.value)}>
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </Select>

      <Label>Color:</Label>
      <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />

      <Label htmlFor="fontSize">Font Size:</Label>
      <Input id="fontSize" type="number" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />

      <IconButton onClick={handleUpdate} title="Update">
        <i className="material-icons">update</i>
      </IconButton>
    </FormContainer>
  );
};

export default ElementPropertiesForm;
