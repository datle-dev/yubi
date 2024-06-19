import { useState, useEffect, useRef } from 'react';
import Word from './Word';
import Stats from './Stats.jsx';
import Cursor from './Cursor.jsx';
import Counter from './Counter.jsx';
import ConfigOptions from './ConfigOptions.jsx';

const TypingTest = () => {
  const [config, setConfig] = useState({
    isTimedTest: true,
    timedTestDuration: 10, // seconds
    isWordsTest: false,
    wordsTestTarget: 25,
  });

  const [words, setWords] = useState([
    'the',
    'quick',
    'brown',
    'fox',
    'jumps',
    'over',
    'the',
    'lazy',
    'dog',
  ]);

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
  const [time, setTime] = useState({
    start: null,
    end: null,
  });
  const [countdown, setCountdown] = useState(config.timedTestDuration);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [typedErrors, setTypedErrors] = useState(0);

  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleKeydown(e) {
      const currentWord = wordsObject[wordIndex].word;
      const nextLetter = wordsObject[wordIndex].word.charAt(letterIndex);

      if (!isTestStarted) {
        setIsTestStarted(true);
        setTime({ ...time, start: new Date() });
      }

      // if user at start of word and types space, do nothing
      if (typedIndex === 0 && e.key === ' ') {
        return;
      }

      // if user not at start of word and types space, go to next word
      if (typedIndex > 0 && e.key === ' ') {
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
      if (e.key === 'Backspace') {
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
      } else if ('abcdefghijklmnopqrstuvwxyz'.includes(e.key)) {
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

  useEffect(() => {
    setWidth(ref.current.offsetWidth);

    const getwidth = () => {
      setWidth(ref.current.offsetWidth);
    };

    window.addEventListener('resize', getwidth);

    return () => window.removeEventListener('resize', getwidth);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(() => {
        if (config.isTimedTest && isTestStarted && !isTestDone)
          return countdown - 1;
        return countdown;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [config.isTimedTest, countdown, isTestStarted, isTestDone]);

  useEffect(() => {
    if (countdown === 0 && !isTestDone) {
      setTime({ ...time, end: new Date() });
      setIsTestDone(true);
    }
  }, [countdown, setTime, time, setIsTestDone, isTestDone]);

  function handleTestMode(e) {
    console.log(e.target.getAttribute('mode'));
    const testMode = e.target.getAttribute('mode');
    if (testMode === 'time') {
      setConfig({ ...config, isTimedTest: true, isWordsTest: false });
    } else if (testMode === 'word') {
      setConfig({ ...config, isTimedTest: false, isWordsTest: true });
    }
  }

  function handleConfigOptions(e) {
    if (config.isTimedTest) {
      setConfig({
        ...config,
        timedTestDuration: e.target.getAttribute('duration'),
      });
      setCountdown(Number(e.target.getAttribute('duration')));
    }
    if (config.isWordsTest) {
      setConfig({ ...config, wordsTestTarget: e.target.getAttribute('words') });
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h2>Debug Info</h2>
        <div>
          <p>config: {JSON.stringify(config)}</p>
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
          <p>width: {width}</p>
          <p>countdown: {countdown} s</p>
        </div>
        {isTestDone && <h2>Test done!</h2>}
        <div>
          <button
            type="button"
            className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
            mode="time"
            onClick={handleTestMode}
          >
            time
          </button>
          <button
            type="button"
            className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
            mode="word"
            onClick={handleTestMode}
          >
            words
          </button>
        </div>
        <ConfigOptions
          isTimedTest={config.isTimedTest}
          isWordsTest={config.isWordsTest}
          onClickHandleConfig={handleConfigOptions}
        />
        <h2>Typing Area</h2>
        <Counter current={wordIndex} total={wordsObject.length} />
        <div
          ref={ref}
          className="relative flex justify-start flex-wrap max-w-prose border"
        >
          <Cursor
            wordsObject={wordsObject}
            wordIndex={wordIndex}
            letterIndex={letterIndex}
            containerWidth={width}
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
