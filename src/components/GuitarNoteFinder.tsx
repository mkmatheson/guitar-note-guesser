import { useState } from 'react';
import { generateNoteSet } from '../utils';
import { standardTuning } from '../const';
const GuitarNoteFinder = () => {
  const [matchingNoteData, setMatchingNoteData] = useState(generateNoteSet());
  return (
    <div>
      <div>
        Where can you find {matchingNoteData.answerNote.answer.slice(0, -1)} on
        the guitar?
      </div>
      <button
        onClick={() => {
          setMatchingNoteData(generateNoteSet());
        }}
      >
        Reset
      </button>
      <div>
        {standardTuning.map((_, idx) => (
          <div>
            {idx + 1}:{' '}
            {matchingNoteData.matchingNotes
              .filter((note) => note.string === idx + 1)
              .map((newNote) => `${newNote.fret}`)
              .join(', ')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuitarNoteFinder;
