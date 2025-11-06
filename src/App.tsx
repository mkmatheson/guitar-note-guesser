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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'left',
                  alignItems: 'start'
                }}
              >
                {data.tablature.map((line) => (
                  <div>{line}</div>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setShowAnswer(false);
                setData(generateNote());
              }}
            >
              Reset
            </button>
            <div>Todo: checklist</div>
          </div>
        )}
      </>
    </div>
  );
}

export default App;
