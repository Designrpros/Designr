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
    
    case 'SELECT_ELEMENT':
      return { ...state, selectedElementId: action.payload, activeTab: 'elementProperties' };

    case 'CLEAR_SELECTED_ELEMENT':
      return { ...state, selectedElementId: null };

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
      // Create a deep copy of sections to avoid direct state mutation
      const newSections = state.sections.map((section, secIndex) => {
        if (section.id === sectionId) {
          // Found the correct section
          const newColumns = section.columns.map((column, colIndex) => {
            if (colIndex === columnIndex) {
              // Found the correct column
              const newElements = column.elements.map((element, elIndex) => {
                if (elIndex === elementIndex) {
                  // Found the correct element, update its properties
                  return { ...element, ...updatedProperties };
                }
                return element; // Return unchanged elements
              });
              return { ...column, elements: newElements }; // Return updated column
            }
            return column; // Return unchanged columns
          });
          return { ...section, columns: newColumns }; // Return updated section
        }
        return section; // Return unchanged sections
      });
      return { ...state, sections: newSections }; // Return updated state
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
