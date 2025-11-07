import './App.css';
import React from 'react';
import GuitarNoteGuesser from './components/GuitarNoteGuesser';
import GuitarNoteFinder from './components/GuitarNoteFinder';

function App() {
  return (
    <div className="App">
      <GuitarNoteGuesser />
      <GuitarNoteFinder />
    </div>
  );
}

export default App;
