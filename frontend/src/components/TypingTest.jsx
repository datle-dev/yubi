import { useState, useEffect } from 'react';
import Word from './Word';
import Stats from './Stats.jsx';
import Cursor from './Cursor.jsx';

const TypingTest = () => {
  const words = [
    'the',
    'quick',
    'brown',
    'fox',
    'jumps',
    'over',
    'the',
    'lazy',
    'dog',
  ];

  const [wordsObject, setWordsObject] = useState(
    words.map((word) => ({
      word: word,
      typed: '',
    })),
  );

  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [typedIndex, setTypedIndex] = useState(0);
  const [isTestDone, setIsTestDone] = useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [time, setTime] = useState({ start: null, end: null });
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [typedErrors, setTypedErrors] = useState(0);

  useEffect(() => {
    function handleKeydown(e) {
      const currentWord = wordsObject[wordIndex].word;
      const nextLetter = wordsObject[wordIndex].word.charAt(letterIndex);

      if (!isTestStarted) {
        setIsTestStarted(true);
        setTime({ ...time, start: new Date() });
      }

      // if user at start of word and types space, do nothing
      if (typedIndex === 0 && (e.key === ' ' || e.keycode === 32)) {
        return;
      }

      // if user not at start of word and types space, go to next word
      if (typedIndex > 0 && (e.key === ' ' || e.keycode === 32)) {
        let newWordIndex = wordIndex + 1;

        // if already on last word, end typing test
        if (newWordIndex >= wordsObject.length) {
          setIsTestDone(true);
          setTime({ ...time, end: new Date() });
          return;
        }

        setWordIndex(newWordIndex);
        setLetterIndex(0);
        setTypedIndex(0);
        setTypedCharacters(typedCharacters + 1);

        return;
      }

      // if user types backspace, remove previously typed character
      if (e.key === 'Backspace' || e.keycode === 8) {
        let newWordsObject = [...wordsObject];
        newWordsObject[wordIndex].typed = newWordsObject[wordIndex].typed.slice(
          0,
          -1,
        );

        setWordsObject(newWordsObject);

        if (letterIndex > 0) {
          let newLetterIndex = letterIndex - 1;
          if (typedIndex <= letterIndex) {
            setLetterIndex(newLetterIndex);
          }
          setTypedIndex(typedIndex - 1);
        }

        return;
      }

      // handle all other user keypresses
      if (e.key === nextLetter) {
        let newWordsObject = [...wordsObject];
        let newLetterIndex = letterIndex + 1;
        let newTypedIndex = typedIndex + 1;

        newWordsObject[wordIndex].typed += e.key;

        setWordsObject(newWordsObject);
        setTypedIndex(newTypedIndex);
        setTypedCharacters(typedCharacters + 1);

        // if user on last word and typed word matches, end typing test
        if (
          wordIndex === wordsObject.length - 1 &&
          newWordsObject[wordIndex].typed === currentWord
        ) {
          setIsTestDone(true);
          setTime({ ...time, end: new Date() });
          return;
        }

        // if word not finished, set letter and its index
        if (newLetterIndex <= currentWord.length) {
          setLetterIndex(newLetterIndex);
          return;
        }
      } else {
        // even if keypress was wrong, capture what user typed
        let newWordsObject = [...wordsObject];
        let newLetterIndex = letterIndex + 1;
        newWordsObject[wordIndex].typed += e.key;

        setWordsObject(newWordsObject);
        setLetterIndex(newLetterIndex);
        setTypedIndex(typedIndex + 1);
        setTypedErrors(typedErrors + 1);
      }
      return;
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [wordsObject, wordIndex, letterIndex, typedIndex, isTestDone]);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h2>Debug Info</h2>
        <div>
          <p>words length: {words.length}</p>
          <p>word index: {wordIndex}</p>
          <p>words object: {JSON.stringify(wordsObject)}</p>
          <p>letter index: {letterIndex}</p>
          <p>typed: {wordsObject[wordIndex].typed}</p>
          <p>typed index: {typedIndex}</p>
          <p>current word: {words[wordIndex]}</p>
          <p>next letter: {words[wordIndex].charAt(letterIndex)}</p>
          <p>test done? {String(isTestDone)}</p>
          <p>start time: {JSON.stringify(time)} </p>
          <p>typed chars: {typedCharacters}</p>
          <p>typed errors: {typedErrors}</p>
        </div>
        {isTestDone && <h2>Test done!</h2>}
        <h2>Typing Area</h2>
        <div className="flex justify-start flex-wrap">
          <Cursor
            wordsObject={wordsObject}
            wordIndex={wordIndex}
            letterIndex={letterIndex}
          />
          {wordsObject.map((wordObject, index) => {
            return (
              <Word
                key={index}
                word={wordObject.word}
                typed={wordObject.typed}
              />
            );
          })}
        </div>
        {isTestDone && (
          <Stats
            wordsObject={wordsObject}
            typedCharacters={typedCharacters}
            typedErrors={typedErrors}
            startTime={time.start}
            endTime={time.end}
          />
        )}
      </div>
    </>
  );
};

export default TypingTest;
