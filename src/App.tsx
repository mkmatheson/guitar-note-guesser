import './App.css';
import React, { useState } from 'react';
import { generateNote } from './utils';

function App() {
  const [data, setData] = useState(generateNote());
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="App">
      <>
        <div>string {data.string}</div>
        <div>fret {data.fret}</div>
        <button onClick={() => setShowAnswer(true)}>Show answer</button>
        {showAnswer && (
          <div>
            <h3>{data.answer}</h3>
            <button
              onClick={() => {
                setShowAnswer(false);
                setData(generateNote());
              }}
            >
              Reset
            </button>
          </div>
        )}
      </>
    </div>
  );
}

export default App;
