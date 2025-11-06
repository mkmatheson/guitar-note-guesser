import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { generateNote } from './utils';
import { standardTuning, completeFretboard } from './const';

const totalNotes = completeFretboard.flatMap((string) =>
  string.flatMap((note) => note)
).length;

function App() {
  const [data, setData] = useState(generateNote());
  const [showAnswer, setShowAnswer] = useState(false);
  const [notes, setNotes] = useState(completeFretboard);
  const showButtonRef = useRef<HTMLButtonElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the Enter key was pressed
      if (event.key === 'ArrowLeft') {
        // Programmatically click the button if the ref exists
        showButtonRef.current?.click();
      } else if (event.key === 'ArrowRight') {
        resetButtonRef.current?.click();
      }
    };

    // Add the event listener to the window
    window.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array ensures this runs once on mount and unmount

  return (
    <div className="App">
      <>
        <div>string {data.string}</div>
        <div>fret {data.fret}</div>
        <div>
          <button ref={showButtonRef} onClick={() => setShowAnswer(true)}>
            Show answer
          </button>
          <button
            ref={resetButtonRef}
            onClick={() => {
              const oldNotes = notes;
              if (showAnswer) {
                oldNotes[data.string - 1][data.fret] = true;
                setNotes(oldNotes);
                setShowAnswer(false);
              }
              let note = undefined;
              while (!note) {
                const newNote = generateNote();
                if (!oldNotes[newNote.string - 1][newNote.fret]) {
                  note = newNote;
                }
              }
              setData(note);
            }}
          >
            Reset
          </button>
        </div>
        <div>
          Notes remaining:{' '}
          {notes.flatMap((string) => string.filter((note) => !note)).length} /{' '}
          {totalNotes}
        </div>

        <div style={{ minHeight: '250px' }}>
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
                  {data.tablature.map((line, idx) => (
                    <div key={`string-#${idx + 1}`}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div style={{ marginLeft: 2 }}>
            {notes[0].map((_, i) => (
              <span style={{ padding: 3 }}>{i}</span>
            ))}
          </div>
          {notes.map((string, idx) => (
            <div>
              {`${standardTuning[idx].keyName} `}
              {string.map((note) => (
                <span style={{ padding: 2 }}>
                  <input type="checkbox" disabled checked={note} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default App;
