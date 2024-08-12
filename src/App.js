import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlashcardList from "./components/FlashCard";
import EditFlashcard from "./components/EditFlashcard"; // Assuming you have this component for editing
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for displaying flashcards */}
          <Route path="/" element={<FlashcardList />} />
          
          {/* Route for editing flashcards */}
          <Route path="/edit" element={<EditFlashcard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
