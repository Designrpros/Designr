// AppStateContext.js
import React, { createContext, useReducer, useContext } from 'react';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
  activeTab: '',
  showGridPanel: false,
  sections: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'TOGGLE_GRID_PANEL':
      return { ...state, showGridPanel: !state.showGridPanel };
    case 'ADD_SECTION':
      return { ...state, sections: [...state.sections, action.payload] };
    case 'ADD_ELEMENT_TO_SECTION': {
      const { sectionId, columnIndex, newElement } = action.payload;
      return {
        ...state,
        sections: state.sections.map(section => {
          if (section.id === sectionId) {
            const updatedColumns = section.columns.map((column, idx) => {
              if (idx === columnIndex) {
                return { ...column, elements: [...column.elements, newElement] };
              }
              return column;
            });
            return { ...section, columns: updatedColumns };
          }
          return section;
        }),
      };
    }
    case 'UPDATE_ELEMENT_PROPERTIES': {
      const { sectionId, columnIndex, elementIndex, updatedProperties } = action.payload;
      return {
        ...state,
        sections: state.sections.map(section => {
          if (section.id === sectionId) {
            const updatedColumns = section.columns.map((column, idx) => {
              if (idx === columnIndex) {
                const updatedElements = column.elements.map((element, elIdx) => {
                  if (elIdx === elementIndex) {
                    return { ...element, ...updatedProperties };
                  }
                  return element;
                });
                return { ...column, elements: updatedElements };
              }
              return column;
            });
            return { ...section, columns: updatedColumns };
          }
          return section;
        }),
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
export const useAppDispatch = () => useContext(AppDispatchContext);
