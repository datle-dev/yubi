import { useState, useEffect, useRef } from 'react';
import Word from './Word';
import Stats from './Stats.jsx';
import Cursor from './Cursor.jsx';
import Counter from './Counter.jsx';
import ConfigOptions from './ConfigOptions.jsx';
import ModeButton from './buttons/ModeButton.jsx';
import WordListButton from './buttons/WordListButton.jsx';

const TypingTest = () => {
  const [config, setConfig] = useState({
    isTimeMode: true,
    timeModeDuration: 15, // seconds
    isWordMode: false,
    wordModeCount: 25,
    wordList: 'default',
  });

  const [wordList, setWordList] = useState([
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

  const [index, setIndex] = useState({
    word: 0,
    letter: 0,
    typed: 0,
  });

  const [status, setStatus] = useState({
    isStarted: false,
    isDone: false,
  });

  const [time, setTime] = useState({
    start: null,
    end: null,
  });

  const [timer, setTimer] = useState(config.timeModeDuration);

  const [count, setCount] = useState({
    typed: 0,
    errors: 0,
  });

  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  const [wordRowMap, setWordRowMap] = useState({});

  function getRandomWords(wordArray, targetNum) {
    let randomizedWords = [];

    for (let i = 0; i < targetNum; i++) {
      let index = Math.floor(Math.random() * wordArray.length);
      randomizedWords.push(wordArray[index]);
    }

    return randomizedWords;
  }

  async function handleGetWordList(e) {
    const listName = e.target.getAttribute('list');
    await fetch(`http://localhost:3000/${listName}`)
      .then((res) => res.json())
      .then((data) => {
        setWordList(data.words);
        setConfig({ ...config, wordList: listName });
      })
      .catch((err) => console.log(err));
  }

  function mapWords(words) {
    const wordArray = words.map((word) => ({
      expected: word,
      typed: '',
    }));
    return wordArray;
  }

  const [tracker, setTracker] = useState(() => {
    if (config.isTimeMode) {
      return mapWords(getRandomWords(wordList, 500));
    } else if (config.isWordMode) {
      return mapWords(getRandomWords(wordList, config.wordModeCount));
    }
  });

  useEffect(() => {
    if (config.isTimeMode) {
      setTracker(mapWords(getRandomWords(wordList, 500)));
    } else if (config.isWordMode) {
      setTracker(mapWords(getRandomWords(wordList, config.wordModeCount)));
    }
  }, [wordList, config]);

  useEffect(() => {
    function handleKeydown(e) {
      e.preventDefault();

      if (status.isDone) {
        if (e.key === 'Enter') {
          handleReset();
        }
        return;
      }

      const currentWord = tracker[index.word].expected;
      const expectedLetter = tracker[index.word].expected.charAt(index.letter);
      const alphaLower = 'abcdefghijklmnopqrstuvwxyz';

      // updates to tracker, index, and count states depend on the condition
      // below, so instantiate only once here, then edit and update state
      // if needed
      let trackerNew = [...tracker];
      let indexNew = { ...index };
      let countNew = { ...count };

      if (!status.isStarted) {
        setStatus({ ...status, isStarted: true });
        setTime({ ...time, start: new Date() });
      }

      // if user types space at start of word, do nothing
      if (e.key === ' ' && index.typed === 0) {
        return;
      }

      // if user types space anywhere else, go to next word
      if (e.key === ' ' && index.typed > 0) {
        let indexNextWord = index.word + 1;

        // if already on last word, end typing test
        if (indexNextWord >= tracker.length && config.isWordMode) {
          setStatus({ ...status, isDone: true });
          setTime({ ...time, end: new Date() });
          return;
        }

        setIndex({
          word: indexNextWord,
          letter: 0,
          typed: 0,
        });

        setCount({ ...count, typed: count.typed + 1 });

        return;
      }

      // if user types backspace, remove previously typed character
      if (e.key === 'Backspace') {
        trackerNew[index.word].typed = trackerNew[index.word].typed.slice(
          0,
          -1,
        );

        if (index.letter > 0) {
          indexNew.typed -= 1;
          indexNew.letter -= 1;
        }

        setIndex(indexNew);
        setTracker(trackerNew);

        return;
      }

      // handle all other user keypresses
      if (e.key === expectedLetter) {
        indexNew.letter += 1;
        indexNew.typed += 1;

        trackerNew[index.word].typed += e.key;

        setTracker(trackerNew);
        setIndex(indexNew);
        setCount({ ...count, typed: count.typed + 1 });

        // if user on last word and typed word matches, end typing test
        if (
          index.word === tracker.length - 1 &&
          trackerNew[index.word].typed === currentWord &&
          config.isWordMode
        ) {
          setStatus({ ...status, isDone: true });
          setTime({ ...time, end: new Date() });
          return;
        }

        // if word not finished, set letter and its index
        if (indexNew.letter <= currentWord.length) {
          setIndex(indexNew);
          return;
        }

        // even if keypress was wrong, capture what user typed
      } else if (alphaLower.includes(e.key)) {
        indexNew.letter += 1;
        indexNew.typed += 1;
        trackerNew[index.word].typed += e.key;
        countNew.expected += 1;
        countNew.errors += 1;

        setTracker(trackerNew);
        setIndex(indexNew);
        setCount(countNew);
      }
      return;
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [config, index, status, time, count, tracker]);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);

    const getWidth = () => {
      setWidth(ref.current.offsetWidth);
    };

    window.addEventListener('resize', getWidth);

    return () => window.removeEventListener('resize', getWidth);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(() => {
        if (config.isTimeMode && status.isStarted && !status.isDone)
          return timer - 1;
        return timer;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [config, status, timer]);

  useEffect(() => {
    if (timer === 0 && !status.isDone) {
      setTime({ ...time, end: new Date() });
      setStatus({ ...status, isDone: true });
    }
  }, [time, timer, status]);

  function handleTestMode(e) {
    const testMode = e.target.getAttribute('mode');
    if (testMode === 'time') {
      setConfig({ ...config, isTimeMode: true, isWordMode: false });
    } else if (testMode === 'word') {
      setConfig({ ...config, isTimeMode: false, isWordMode: true });
    }
  }

  function handleConfigOptions(e) {
    if (config.isTimeMode) {
      const duration = Number(e.target.getAttribute('duration'));

      setConfig({
        ...config,
        timeModeDuration: duration,
      });

      resetTimeMode(duration);
    } else if (config.isWordMode) {
      const num = Number(e.target.getAttribute('count'));

      setConfig({
        ...config,
        wordModeCount: num,
      });

      resetWordMode(num);
    }
  }

  function resetTimeMode(duration) {
    setIndex({
      word: 0,
      letter: 0,
      typed: 0,
    });
    setStatus({
      isStarted: false,
      isDone: false,
    });
    setTime({
      start: null,
      end: null,
    });
    setTimer(duration);
    setCount({
      typed: 0,
      errors: 0,
    });
    setTracker(mapWords(getRandomWords(wordList, 500)));
  }

  function resetWordMode(num) {
    setIndex({
      word: 0,
      letter: 0,
      typed: 0,
    });
    setStatus({
      isStarted: false,
      isDone: false,
    });
    setTime({
      start: null,
      end: null,
    });
    setTimer(config.timeModeDuration);
    setCount({
      typed: 0,
      errors: 0,
    });
    setTracker(mapWords(getRandomWords(wordList, num)));
  }

  // handler function to pass as callback to the reset button
  // which only passes config values as parameters
  function handleReset() {
    if (config.isTimeMode) {
      resetTimeMode(config.timeModeDuration);
    } else if (config.isWordMode) {
      resetWordMode(config.wordModeCount);
    }
  }

  const [rowOffsets, setRowOffsets] = useState({});

  useEffect(() => {
    let row = 0;
    let sumWidth = 0;

    let rowOffsetsTemp = { 0: 0 };
    let wordRowMapTemp = {};

    for (let i = 0; i < tracker.length; i++) {
      const wordLength = Math.max(
        tracker[i].expected.length,
        tracker[i].typed.length,
      );
      const wordSpacing = (wordLength + 1) * 18; // 18px per character + one space
      sumWidth += wordSpacing;

      if (sumWidth > width) {
        row += 1;
        rowOffsetsTemp[row] = sumWidth - wordSpacing + rowOffsetsTemp[row - 1];
        sumWidth = wordSpacing;
      }

      wordRowMapTemp[i] = row;
    }

    setRowOffsets(rowOffsetsTemp);
    setWordRowMap(wordRowMapTemp);
  }, [width, tracker]);

  return (
    <>
      <div className="flex flex-col justify-center items-center px-4">
        <section className="flex flex-col gap-2 my-4">
          <button
            type="button"
            className="bg-sky-950 text-sky-300/50 hover:text-sky-200 p-2"
            onClick={handleReset}
          >
            reset
          </button>
          <div className="flex justify-between gap-4">
            <div>
              <ModeButton
                text={'time'}
                mode={'time'}
                onClick={handleTestMode}
                isActive={config.isTimeMode}
              />
              <ModeButton
                text={'word'}
                mode={'word'}
                onClick={handleTestMode}
                isActive={config.isWordMode}
              />
            </div>
            <ConfigOptions
              isTimeMode={config.isTimeMode}
              isWordMode={config.isWordMode}
              timeModeDuration={config.timeModeDuration}
              wordModeCount={config.wordModeCount}
              onClick={handleConfigOptions}
            />
          </div>
          <div className="flex justify-center gap-2">
            <WordListButton
              text={'english-100'}
              list={'english-100'}
              onClick={handleGetWordList}
              isActive={config.wordList === 'english-100'}
            />
            <WordListButton
              text={'hololive-en'}
              list={'hololive-en'}
              onClick={handleGetWordList}
              isActive={config.wordList === 'hololive-en'}
            />
          </div>
        </section>
        <section className="flex flex-col gap-2 justify-center items-center my-4">
          {!status.isStarted && <p className="text-2xl">type to begin test</p>}
          {config.isWordMode && status.isStarted && !status.isDone && (
            <p className="text-2xl">
              {index.word}/{tracker.length}
            </p>
          )}
          {config.isTimeMode && status.isStarted && !status.isDone && (
            <p className="text-2xl">{timer}s</p>
          )}
          {status.isDone && <p className="text-2xl">test complete</p>}
          <div
            ref={ref}
            className="relative flex justify-start content-start flex-wrap max-w-3xl min-h-32"
          >
            <Cursor
              tracker={tracker}
              indexWord={index.word}
              indexLetter={index.letter}
              wordRowMap={wordRowMap}
              rowOffsets={rowOffsets}
            />
            {tracker.map((entry, ind) => {
              return (
                <Word
                  key={ind}
                  expected={entry.expected}
                  typed={entry.typed}
                  index={ind}
                  indexWord={index.word}
                  wordRowMap={wordRowMap}
                />
              );
            })}
          </div>
        </section>
        {status.isDone && (
          <section>
            <Stats
              tracker={tracker}
              countTyped={count.typed}
              countErrors={count.errors}
              timeStart={time.start}
              timeEnd={time.end}
              isTimeMode={config.isTimeMode}
            />
          </section>
        )}
      </div>
    </>
  );
};

export default TypingTest;
