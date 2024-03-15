import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EditorProvider } from './context/EditorContext'; // Adjust the import path
import DndProvider from './context/DndProviderSetup';
import { HTML5Backend } from 'react-dnd-html5-backend';

import HomePage from './pages/HomePage';
import WebsiteBuilder from './pages/WebsiteBuilder';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <EditorProvider>
    <DndProvider backend={HTML5Backend}>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit/:websiteId" element={<WebsiteBuilder />} />
          </Routes>
        </Router>
        </AppProvider>
      </DndProvider>
    </EditorProvider>
  );
}

export default App;
