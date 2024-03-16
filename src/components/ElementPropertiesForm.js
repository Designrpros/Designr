import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../context/AppStateContext';
import { SketchPicker } from 'react-color';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #333;
  color: white;
  padding: 20px;
  border-radius: 8px;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ColorPickerContainer = styled.div`
  margin-bottom: 20px;
`;

const AlignmentContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const AlignmentButton = styled(IconButton)`
  color: ${({ $active }) => ($active ? 'cyan' : 'white')};
`;


const ElementPropertiesForm = ({ element }) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState(element.content);
  const [textAlign, setTextAlign] = useState(element.styles.textAlign);
  const [color, setColor] = useState(element.styles.color);
  const [fontSize, setFontSize] = useState(element.styles.fontSize);
  const [showColorPicker, setShowColorPicker] = useState(false);

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

      <Label>Text Align:</Label>
      <AlignmentContainer>
      <AlignmentButton $active={textAlign === 'left'} onClick={() => setTextAlign('left')} title="Align left">
        <i className="material-icons">format_align_left</i>
      </AlignmentButton>
        <AlignmentButton active={textAlign === 'center'} onClick={() => setTextAlign('center')} title="Align center">
          <i className="material-icons">format_align_center</i>
        </AlignmentButton>
        <AlignmentButton active={textAlign === 'right'} onClick={() => setTextAlign('right')} title="Align right">
          <i className="material-icons">format_align_right</i>
        </AlignmentButton>
      </AlignmentContainer>

      <Label>Color:</Label>
      <ColorPickerContainer>
        <IconButton onClick={() => setShowColorPicker(!showColorPicker)} title="Toggle color picker">
          <i className="material-icons">color_lens</i>
        </IconButton>
        {showColorPicker && (
          <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
        )}
      </ColorPickerContainer>

      <Label htmlFor="fontSize">Font Size:</Label>
      <Input id="fontSize" type="number" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />

      <IconButton onClick={handleUpdate} title="Update">
        <i className="material-icons">update</i>
      </IconButton>
    </FormContainer>
  );
};

export default ElementPropertiesForm;
