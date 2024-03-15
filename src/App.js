import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EditorProvider } from './context/EditorContext'; // Adjust the import path

import HomePage from './pages/HomePage';
import WebsiteBuilder from './pages/WebsiteBuilder';
import { AppProvider } from './context/AppStateContext';

function App() {
  return (
    <EditorProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit/:websiteId" element={<WebsiteBuilder />} />
          </Routes>
        </Router>
        </AppProvider>
    </EditorProvider>
  );
}

export default App;
