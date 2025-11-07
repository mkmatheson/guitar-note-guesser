import {
  accidentalSymbols,
  keyNotes,
  frets,
  standardTuning,
  completeFretboard
} from './const';
import { KeyNote } from './types';

const shiftScale = (index: number, notes: Array<string | number | KeyNote[]>) =>
  [...notes].slice(index).concat([...notes].slice(0, index));

const generateRandomArrayIdx = (length: number) =>
  Math.floor(Math.random() * length);

const createLine = (stringChar: string, fretIdx?: number) => {
  // e |-----0------|
  return `${stringChar} |-----${isNaN(fretIdx as number) ? '-' : fretIdx}-----|`;
};

const createTablature = (selectedStringIdx: number, fretIdx: number) => {
  return standardTuning.map((string, idx) => {
    const stringChar = idx < 1 ? string.keyName : string.keyName.toUpperCase();
    return createLine(
      stringChar,
      selectedStringIdx === idx ? fretIdx : undefined
    );
  });
};

const getNote = (stringIdx: number, fretIdx: number) => {
  const selectedString = standardTuning[stringIdx];
  const startingKeyNoteIdx = keyNotes.findIndex((key) =>
    key.find(
      (keyName) =>
        keyName.key.toLowerCase() === selectedString.keyName.toLowerCase() &&
        keyName.accidental === 0
    )
  );

  const naturalKeyLineup = (
    shiftScale(startingKeyNoteIdx, keyNotes) as KeyNote[][]
  ).map((keyNote) => {
    return (
      keyNote.find((key) => key.accidental === 0) ||
      keyNote.find((key) => key.accidental === -1) || {
        key: 'e',
        accidental: 0
      }
    );
  });

  naturalKeyLineup.push(...naturalKeyLineup);
  naturalKeyLineup.splice(frets + 1);
  let startingOctave = selectedString.octave;

  for (let i = 0; i <= fretIdx; i += 1) {
    if (
      naturalKeyLineup[i].key.toLowerCase() === 'c' &&
      naturalKeyLineup[i].accidental === 0
    ) {
      startingOctave += 1;
    }
  }

  const newKeyNote = naturalKeyLineup[fretIdx];
  return {
    string: stringIdx + 1,
    fret: fretIdx,
    answer: `${newKeyNote.key}${accidentalSymbols[newKeyNote.accidental || 0]}${startingOctave}`
  };
};

const getRandomStringAndFretIndex = () => ({
  stringIdx: generateRandomArrayIdx(standardTuning.length),
  fretIdx: generateRandomArrayIdx(frets + 1)
});

const getAllNotes = () => {
  return completeFretboard.map((string, stringIdx) =>
    string.map((_, fretIdx) => {
      return getNote(stringIdx, fretIdx);
    })
  );
};

export const generateNoteSet = () => {
  const { stringIdx: randomStringIdx, fretIdx: randomFretIdx } =
    getRandomStringAndFretIndex();
  const selectedNote = getNote(randomStringIdx, randomFretIdx);
  return {
    matchingNotes: getAllNotes()
      .flatMap((string) => string)
      .filter(
        (note) => note.answer.slice(0, -1) === selectedNote.answer.slice(0, -1)
      ),
    answerNote: selectedNote
  };
};

export const generateNote = () => {
  const { stringIdx: randomStringIdx, fretIdx: randomFretIdx } =
    getRandomStringAndFretIndex();

  return {
    ...getNote(randomStringIdx, randomFretIdx),
    tablature: createTablature(randomStringIdx, randomFretIdx)
  };
};
