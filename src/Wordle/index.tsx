/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import './styles.css';

const WORDS = Object.freeze([
  'APPLE',
  'BEAST',
  'FAINT',
  'FEAST',
  'FRUIT',
  'GAMES',
  'PAINT',
  'PASTE',
  'TOWER',
  'REACT',
]);

const CHANCES = 6;
const WORD_SIZE = 5;

export default function Wordle() {
  const word = 'APPLE';
  const initialState = new Array(CHANCES)
    .fill('')
    .map(() => new Array(WORD_SIZE).fill(''));
  const [enteredWord, setEnteredWord] = useState<string | null>(null);
  const [wordList, setWordList] = useState(initialState);
  // const [currentChance, setCurrentChance] = useState(0);
  // const [currentCol, setCurrentCol] = useState(0);

  const currentChance = useRef(0);
  const currentCol = useRef(0);

  useEffect(() => {
    const keypressHandler = (e: KeyboardEvent) => {
      console.log('key press', e.key, wordList, currentChance, currentCol);
      const wordListCopy = JSON.parse(JSON.stringify(wordList));
      wordListCopy[currentChance.current][currentCol.current] = e.key;
      currentCol.current = (currentCol.current + 1) % WORD_SIZE;
      if (currentCol.current === 4) {
        currentChance.current += 1;
      }
      console.log('copy word list', wordListCopy);
      setWordList([...wordListCopy]);
    };

    window.addEventListener('keypress', keypressHandler);

    return () => {
      window.removeEventListener('keypress', keypressHandler);
    };
  }, []);

  if (currentChance.current === 5 && currentCol.current === 4) {
    console.log('game over');
  }

  console.log('rendering');

  return (
    <div className="wordle-app">
      <h1>Wordle</h1>
      <div className="game-container">
        {new Array(CHANCES).fill(0).map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {new Array(WORD_SIZE).fill(0).map((column, colIndex) => {
                let letter = null;
                if (wordList.length) {
                  letter = wordList[rowIndex][colIndex];
                }
                return (
                  <div key={colIndex} className="col">
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
