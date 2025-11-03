import { KeyNote } from './types';

// 1 (E)	329.63 Hz	E4
// 2 (B)	246.94 Hz	B3
// 3 (G)	196.00 Hz	G3
// 4 (D)	146.83 Hz	D3
// 5 (A)	110.00 Hz	A2
// 6 (E)	82.41 Hz	E2

export const standardTuning: { keyName: string; octave: number }[] = [
  { keyName: 'e', octave: 4 },
  { keyName: 'b', octave: 3 },
  { keyName: 'g', octave: 3 },
  { keyName: 'd', octave: 3 },
  { keyName: 'a', octave: 2 },
  { keyName: 'e', octave: 2 }
];

export const frets = 15;

export const naturalKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export const keyNotes: KeyNote[][] = [
  [
    { key: 'B', accidental: 1 },
    { key: 'C', accidental: 0, modes: ['ionian'] },
    { key: 'D', accidental: -2 }
  ],
  [
    {
      key: 'C',
      accidental: 1,
      modes: ['ionian'],
      isEnharmonic: true,
      accidentalType: 1
    },
    {
      key: 'D',
      accidental: -1,
      accidentalType: -1,
      modes: ['ionian'],
      isEnharmonic: true
    }
  ],
  [
    { key: 'D', accidental: 0, accidentalType: 1, modes: ['ionian'] },
    { key: 'E', accidental: -2 }
  ],
  [
    { key: 'D', accidental: 1, modes: ['aeolian'] },
    { key: 'E', accidental: -1, modes: ['ionian'] },
    { key: 'F', accidental: -2 }
  ],
  [
    { key: 'F', accidental: -1 },
    { key: 'E', accidental: 0, accidentalType: 1, modes: ['ionian'] }
  ],
  [
    { key: 'E', accidental: 1 },
    { key: 'F', accidental: 0, accidentalType: -1, modes: ['ionian'] },
    { key: 'G', accidental: -2 }
  ],
  [
    {
      key: 'F',
      accidental: 1,
      accidentalType: 1,
      modes: ['ionian'],
      isEnharmonic: true
    },
    {
      key: 'G',
      accidental: -1,
      accidentalType: -1,
      modes: ['ionian'],
      isEnharmonic: true
    }
  ],
  [
    { key: 'G', accidental: 0, accidentalType: 1, modes: ['ionian'] },
    { key: 'F', accidental: 2 },
    { key: 'A', accidental: -2 }
  ],
  [
    { key: 'G', accidental: 1, modes: ['aeolian'] },
    { key: 'A', accidental: -1, modes: ['ionian'] },
    { key: 'B', accidental: -3 }
  ],
  [
    { key: 'A', accidental: 0, accidentalType: 1, modes: ['ionian'] },
    { key: 'G', accidental: 2 },
    { key: 'B', accidental: -2 }
  ],
  [
    { key: 'A', accidental: 1, modes: ['aeolian'] },
    { key: 'B', accidental: -1, modes: ['ionian'] },
    { key: 'C', accidental: -2 }
  ],
  [
    {
      key: 'B',
      accidental: 0,
      accidentalType: 1,
      modes: ['ionian'],
      isEnharmonic: true
    },
    {
      key: 'C',
      accidental: -1,
      accidentalType: -1,
      modes: ['ionian'],
      isEnharmonic: true
    }
  ]
];

export const blankKey: KeyNote = { key: '', accidental: 0, modes: [] };

export const accidentals: { name: 'flats' | 'sharps'; value: -1 | 1 }[] = [
  { name: 'flats', value: -1 },
  { name: 'sharps', value: 1 }
];

export const accidentalSymbols: { [key: string]: string } = {
  '-3': '𝄫♭',
  '-2': '𝄫',
  '-1': '♭',
  '0': '',
  '1': '♯',
  '2': '𝄪'
};

// todo: use scales to determine chord based on scale degree
// remember that ionian is 1 but has index 0
export const modes = [
  'ionian',
  'dorian',
  'phrygian',
  'lydian',
  'mixolydian',
  'aeolian',
  'locrian'
];
