// AppStateContext.js
import React, { createContext, useReducer, useContext } from 'react';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
  activeTab: '',
  showGridPanel: false,
  sections: [], // Start with an empty array of sections
  selectedElement: null,
};





function appReducer(state, action) {
  console.log('Dispatched action:', action.type, action.payload); // Add this line

  switch (action.type) {
    
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    
    case 'TOGGLE_GRID_PANEL':
      return { ...state, showGridPanel: !state.showGridPanel };
    
      case 'ADD_SECTION_WITH_COLUMNS': {
        const { columns } = action.payload;
        const newSection = {
          id: `section-${Date.now()}`,
          columns: Array.from({ length: columns }, (_, colIndex) => ({
            id: `column-${Date.now()}-${colIndex}`,
            slots: Array.from({ length: 9 }, (_, slotIndex) => ({ // Ensure each column starts with 9 slots
              id: `slot-${Date.now()}-${colIndex}-${slotIndex}`,
              elements: [],
            })),
          })),
        };
        return { ...state, sections: [...state.sections, newSection] };
      }
      
      case 'ADD_ELEMENT_TO_SLOT_AND_EXPAND': {
        const { slotId, item } = action.payload;
        return {
          ...state,
          sections: state.sections.map(section => ({
            ...section,
            columns: section.columns.map(column => ({
              ...column,
              slots: column.slots.map(slot => {
                if (slot.id === slotId) {
                  return {
                    ...slot,
                    elements: [...slot.elements, item],
                    expanded: true, // Set the slot to expanded
                  };
                }
                return slot;
              }),
            })),
          })),
        };
      }
      
      
      
      case 'SELECT_ELEMENT':
        return { ...state, selectedElement: action.payload };
      
        case 'CLEAR_SELECTED_ELEMENT':
          return { ...state, selectedElement: null };


          case 'ADD_ELEMENT_TO_CANVAS': {
            const newElement = {
              id: Date.now().toString(),
              ...action.payload.item,
            };
          
            // Simplified example: Add to the first slot of the first column of the first section
            if (state.sections.length > 0) {
              const updatedSections = [...state.sections];
              const firstSection = updatedSections[0];
              if (firstSection.columns.length > 0) {
                const firstColumn = firstSection.columns[0];
                if (firstColumn.slots.length > 0) {
                  firstColumn.slots[0].elements.push(newElement);
                }
              }
              return { ...state, sections: updatedSections };
            }
            return state;
          }
          

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


    case 'ADD_ELEMENT_TO_SLOT': {
      const { sectionId, columnId, slotId, newElement } = action.payload;
      return {
        ...state,
        sections: state.sections.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              columns: section.columns.map(column => {
                if (column.id === columnId) {
                  return {
                    ...column,
                    slots: column.slots.map(slot => {
                      if (slot.id === slotId) {
                        return { ...slot, elements: [...slot.elements, newElement] };
                      }
                      return slot;
                    }),
                  };
                }
                return column;
              }),
            };
          }
          return section;
        }),
      };
    }
    

    case 'UPDATE_COLUMN_WITH_ELEMENT': {
      const { sectionId, columnIndex, newElement, dropIndex } = action.payload;
      return {
        ...state,
        sections: state.sections.map(section => {
          if (section.id === sectionId) {
            const updatedColumns = section.columns.map((column, idx) => {
              if (idx === columnIndex) {
                let updatedElements = [...column.elements];
                if (dropIndex >= updatedElements.length) {
                  updatedElements.push(newElement);
                } else {
                  updatedElements.splice(dropIndex, 0, newElement);
                }
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

    case 'UPDATE_ELEMENT_PROPERTIES': {
      const { id, content } = action.payload;
      console.log('Before update:', state);
    
      const newState = {
        ...state,
        sections: state.sections.map(section => ({
          ...section,
          columns: section.columns.map(column => ({
            ...column,
            elements: (column.elements || []).map(element => {
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
      const { id, content, styles, position } = action.payload;
      return {
        ...state,
        sections: state.sections.map(section => ({
          ...section,
          columns: section.columns.map(column => ({
            ...column,
            slots: column.slots.map(slot => ({
              ...slot,
              elements: slot.elements.map(element => {
                // Check if this is the element to update
                if (element.id === id) {
                  // Update only the targeted element
                  return {
                    ...element,
                    content,
                    styles: { ...element.styles, ...styles },
                    position: { ...element.position, ...position }
                  };
                }
                // Leave other elements unchanged
                return element;
              })
            }))
          }))
        }))
      };
    }
    
    
    
    
    
    case 'INSERT_ELEMENT_AT_POSITION': {
      const { sectionId, columnIndex, newElement, dropIndex, placement } = action.payload;
      return {
        ...state,
        sections: state.sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              columns: section.columns.map((column, idx) => {
                if (idx === columnIndex) {
                  let updatedElements = [...column.elements];
                  // Ensure the row exists
                  if (!updatedElements[dropIndex]) {
                    updatedElements[dropIndex] = { left: null, center: null, right: null };
                  }
                  // Add the new element in its placement
                  updatedElements[dropIndex][placement] = newElement;
                  return { ...column, elements: updatedElements };
                }
                return column;
              }),
            };
          }
          return section;
        }),
      };
    }
    

    

    
    
    case 'UPDATE_ELEMENT_SIZE': {
      const { sectionId, columnIndex, elementId, newSize } = action.payload;
      return {
        ...state,
        sections: state.sections.map((section) => {
          if (section.id === sectionId) {
            const updatedColumns = section.columns.map((column, idx) => {
              if (idx === columnIndex) {
                const updatedElements = (column.elements || []).map((element) => {
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
