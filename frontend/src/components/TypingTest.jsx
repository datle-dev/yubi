import { useState, useEffect, useMemo } from 'react';
import Word from './Word';

const TypingTest = () => {
  const words = useMemo(() => {
    return [
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
  }, []);

  const [wordsObject, setWordsObject] = useState(
    words.map((word) => ({
      word: word,
      typed: '',
    })),
  );

  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [typedIndex, setTypedIndex] = useState(0);
  const [isTestDone, setIsTestDone] = useState(false);

  useEffect(() => {
    function handleKeydown(e) {
      const currentWord = wordsObject[wordIndex].word;
      const nextLetter = wordsObject[wordIndex].word.charAt(letterIndex);

      // if user at start of word and types space, do nothing
      if (typedIndex === 0 && (e.key === ' ' || e.keycode === 32)) {
        return;
      }

      // if user not at start of word and types space, go to next word
      if (typedIndex > 0 && (e.key === ' ' || e.keycode === 32)) {
        let newWordIndex = wordIndex + 1;
        let newWordsObject = [...wordsObject];
        newWordsObject[wordIndex].typed = typed;

        // if already on last word, end typing test
        if (newWordIndex >= wordsObject.length) {
          setWordsObject(newWordsObject);
          setIsTestDone(true);
          return;
        }

        setWordIndex(newWordIndex);
        setWordsObject(newWordsObject);
        setLetterIndex(0);
        setTyped('');
        setTypedIndex(0);

        return;
      }

      // if user types backspace, remove previously typed character
      if (e.key === 'Backspace' || e.keycode === 8) {
        let newTyped = typed.slice(0, -1);
        let newWordsObject = [...wordsObject];

        newWordsObject[wordIndex].typed = newTyped;

        setWordsObject(newWordsObject);
        setTyped(newTyped);
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
        let newTyped = typed.concat('', e.key);
        let newTypedIndex = typedIndex + 1;

        newWordsObject[wordIndex].typed = newTyped;

        setWordsObject(newWordsObject);
        setTyped(newTyped);
        setTypedIndex(newTypedIndex);

        // if user on last word and typed word matches, end typing test
        if (wordIndex === wordsObject.length - 1 && newTyped === currentWord) {
          setIsTestDone(true);
          return;
        }

        // if word not finished, set letter and its index
        if (newLetterIndex < currentWord.length) {
          let newLetterIndex = letterIndex + 1;
          setLetterIndex(newLetterIndex);
          return;
        }
      } else {
        // even if keypress was wrong, capture what user typed
        let newWordsObject = [...wordsObject];
        let newTyped = typed.concat('', e.key);
        newWordsObject[wordIndex].typed = newTyped;

        setWordsObject(newWordsObject);
        setTyped(typed.concat('', e.key));
        setTypedIndex(typedIndex + 1);
      }
      return;
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [wordsObject, wordIndex, letterIndex, typed, typedIndex, isTestDone]);

  return (
    <>
      <div>
        <div>
          <h2>Debug Info</h2>
          <p>words length: {words.length}</p>
          <p>word index: {wordIndex}</p>
          <p>words object: {JSON.stringify(wordsObject)}</p>
          <p>letter index: {letterIndex}</p>
          <p>typed: {typed}</p>
          <p>typed index: {typedIndex}</p>
          <p>current word: {words[wordIndex]}</p>
          <p>next letter: {words[wordIndex].charAt(letterIndex)}</p>
          <p>test done? {String(isTestDone)}</p>
        </div>
        {isTestDone && <h2>Test done!</h2>}
        <div>
          <h2>Typing Area</h2>
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
      </div>
    </>
  );
};

export default TypingTest;
