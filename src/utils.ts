import { accidentalSymbols, keyNotes, frets, standardTuning } from './const';
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

export const generateNote = () => {
  const selectedStringIdx = generateRandomArrayIdx(standardTuning.length);
  const selectedString = standardTuning[selectedStringIdx];
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
  const selectedFretIndex = generateRandomArrayIdx(frets + 1);

  for (let i = 0; i <= selectedFretIndex; i += 1) {
    if (
      naturalKeyLineup[i].key.toLowerCase() === 'c' &&
      naturalKeyLineup[i].accidental === 0
    ) {
      startingOctave += 1;
    }
  }

  const newKeyNote = naturalKeyLineup[selectedFretIndex];

  return {
    string: selectedStringIdx + 1,
    fret: selectedFretIndex,
    answer: `${newKeyNote.key}${accidentalSymbols[newKeyNote.accidental || 0]}${startingOctave}`,
    tablature: createTablature(selectedStringIdx, selectedFretIndex)
  };
};
