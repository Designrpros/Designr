import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../context/AppContext';

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 10px;
  background: #4b4b4b;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
`;

const Icon = styled.div`
  color: white;
  margin: 10px;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
`;

const VerticalToolbar = () => {
  const dispatch = useAppDispatch();

  const handleSetActiveTab = (tab) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  return (
    <ToolbarContainer>
      <Icon onClick={() => handleSetActiveTab('addSection')}>
        <i className="material-icons">add</i>
      </Icon>
      <Icon onClick={() => handleSetActiveTab('tools')}>
        <i className="material-icons">build</i>
      </Icon>
      <Icon onClick={() => handleSetActiveTab('pageManager')}>
        <i className="material-icons">folder</i>
      </Icon>
      <Icon onClick={() => handleSetActiveTab('terminal')}>
        <i className="material-icons">code</i>
      </Icon>
    </ToolbarContainer>
  );
};

export default VerticalToolbar;
