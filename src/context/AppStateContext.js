// AppStateContext.js
import React, { createContext, useReducer, useContext } from 'react';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
  activeTab: '',
  showGridPanel: false,
  sections: [],
  selectedElement: null, // Ensure this is part of your initial state
};


function appReducer(state, action) {
  console.log('Dispatched action:', action.type, action.payload); // Add this line

  switch (action.type) {
    
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    
    case 'TOGGLE_GRID_PANEL':
      return { ...state, showGridPanel: !state.showGridPanel };
    
    case 'ADD_SECTION':
      return { ...state, sections: [...state.sections, action.payload] };
    
      case 'SELECT_ELEMENT':
        return { ...state, selectedElement: action.payload, activeTab: 'elementProperties' };
      
        case 'CLEAR_SELECTED_ELEMENT':
          return { ...state, selectedElement: null };


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
      const { id, content } = action.payload;
      console.log('Before update:', state);
    
      const newState = {
        ...state,
        sections: state.sections.map(section => ({
          ...section,
          columns: section.columns.map(column => ({
            ...column,
            elements: column.elements.map(element => {
              if (element.id === id) {
                console.log(`Updating element ${id}`);
                return { ...element, content };
              }
              return element;
            }),
          })),
        })),
      };
    
      console.log('After update:', newState);
      return newState;
    }
    
    case 'UPDATE_ELEMENT_CONTENT_AND_STYLES': {
      const { id, content, styles } = action.payload;
      console.log('Before update:', JSON.stringify(state, null, 2));
      const newState = {
        ...state,
        sections: state.sections.map(section => ({
          ...section,
          columns: section.columns.map(column => ({
            ...column,
            elements: column.elements.map(element => {
              if (element.id === id) {
                const updatedStyles = { ...element.styles, ...styles };
                console.log(`Updating element ${id} with styles:`, updatedStyles);
                return { ...element, content, styles: updatedStyles };
              }
              return element;
            }),
          })),
        })),
      };
      console.log('After update:', JSON.stringify(newState, null, 2));
      return newState;
    }
    
    
    

    
    
    case 'UPDATE_ELEMENT_SIZE': {
      const { sectionId, columnIndex, elementId, newSize } = action.payload;
      return {
        ...state,
        sections: state.sections.map((section) => {
          if (section.id === sectionId) {
            const updatedColumns = section.columns.map((column, idx) => {
              if (idx === columnIndex) {
                const updatedElements = column.elements.map((element) => {
                  if (element.id === elementId) {
                    return { ...element, size: newSize };
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
