import { useState, useEffect } from 'react';
import Header from './components/Header';
import ConfigMenu from './components/ConfigMenu';
import StatusBar from './components/StatusBar';
import TypingArea from './components/TypingArea';
import Results from './components/Results';

function App() {
  const [config, setConfig] = useState(() => {
    if (window.localStorage.getItem('yubi') === null) {
      return {
        isTimeMode: true,
        timeModeDuration: 15, // seconds
        isWordMode: false,
        wordModeCount: 25,
        wordGroup: 'default',
      };
    } else {
      return JSON.parse(window.localStorage.getItem('yubi'));
    }
  });
  const [wordGroup, setWordGroup] = useState(config.wordGroup);
  const [status, setStatus] = useState({
    isStarted: false,
    isDone: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [tracker, setTracker] = useState([]);
  const [index, setIndex] = useState({
    word: 0,
    letter: 0,
    typed: 0,
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
  const [typingAreaKey, setTypingAreaKey] = useState(Math.random());

  useEffect(() => {
    window.localStorage.setItem('yubi', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    setConfig({ ...config, wordGroup: wordGroup });
  }, [wordGroup]);

  useEffect(() => {
    async function fetchWordList() {
      await fetch(`http://localhost:3000/api/wordgroups/${wordGroup}`)
        .then((res) => res.json())
        .then((data) => {
          setWords(data.words);
          if (config.isTimeMode) {
            setTracker(getRandomWords(data.words, 500));
          } else if (config.isWordMode) {
            setTracker(getRandomWords(data.words, config.wordModeCount));
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }

    fetchWordList();
    handleReset();
  }, [wordGroup]);

  useEffect(() => {
    if (config.isTimeMode) {
      setTracker(getRandomWords(words, 500));
    } else if (config.isWordMode) {
      setTracker(getRandomWords(words, config.wordModeCount));
    }
  }, [words, config]);

  function handleKeyDown(e) {
    const currentWord = tracker[index.word].expected;
    const expectedLetter = tracker[index.word].expected.charAt(index.letter);
    const alphaLower = "abcdefghijklmnopqrstuvwxyz'";

    if (alphaLower.includes(e.key)) {
      e.preventDefault();
    }

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

  function handleKeyDownReset(e) {
    if (status.isDone) {
      if (e.key === 'Enter') {
        handleReset();
      }
      return;
    }
  }

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

  function getRandomWords(wordArray, targetNum) {
    const queueLength = Math.min(wordArray.length - 1, 25);

    if (wordArray.length === 0) {
      return [{ expected: '', typed: '' }];
    }

    let randomizedWords = [];
    let indexQueue = [];
    let indexToAdd = Math.floor(Math.random() * wordArray.length);

    while (indexQueue.length < queueLength) {
      while (indexQueue.includes(indexToAdd)) {
        indexToAdd = Math.floor(Math.random() * wordArray.length);
      }
      indexQueue.push(indexToAdd);
    }

    randomizedWords.push(wordArray[indexQueue.shift()]);

    while (randomizedWords.length < targetNum) {
      indexToAdd = Math.floor(Math.random() * wordArray.length);
      while (indexQueue.includes(indexToAdd)) {
        indexToAdd = Math.floor(Math.random() * wordArray.length);
      }
      indexQueue.push(indexToAdd);
      randomizedWords.push(wordArray[indexQueue.shift()]);
    }

    return randomizedWords.map((word) => ({ expected: word, typed: '' }));
  }

  function handleWordGroup(e) {
    if (wordGroup === e.target.getAttribute('group')) return;

    setIsLoading(true);
    setWordGroup(e.target.getAttribute('group'));
    setTypingAreaKey(Math.random());
  }

  function handleMode(e) {
    const testMode = e.target.getAttribute('mode');

    if (testMode === 'time') {
      if (config.isTimeMode) return;
      setConfig({ ...config, isTimeMode: true, isWordMode: false });
    } else if (testMode === 'word') {
      if (config.isWordMode) return;
      setConfig({ ...config, isTimeMode: false, isWordMode: true });
    }
    setTypingAreaKey(Math.random());
    handleReset();
  }

  function handleConfig(e) {
    if (config.isTimeMode) {
      const duration = Number(e.target.getAttribute('duration'));

      if (config.timeModeDuration === duration) return;

      setConfig({
        ...config,
        timeModeDuration: duration,
      });

      resetTimeMode(duration);
    } else if (config.isWordMode) {
      const num = Number(e.target.getAttribute('count'));

      if (config.wordModeCount === num) return;

      setConfig({
        ...config,
        wordModeCount: num,
      });

      resetWordMode(num);
    }

    setTypingAreaKey(Math.random());
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
    setTracker(getRandomWords(words, 500));
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
    setTracker(getRandomWords(words, num));
  }

  // handler function to pass as callback to the reset button
  // which only passes config values as parameters
  function handleReset() {
    if (config.isTimeMode) {
      resetTimeMode(config.timeModeDuration);
    } else if (config.isWordMode) {
      resetWordMode(config.wordModeCount);
    }
    setTypingAreaKey(Math.random());
  }

  return (
    <>
      <div
        className="flex flex-col items-center min-w-80 font-mono text-sky-300/50"
        onKeyDown={handleKeyDownReset}
        tabIndex="0"
      >
        <Header />
        <ConfigMenu
          config={config}
          wordGroup={wordGroup}
          onClickReset={handleReset}
          onClickMode={handleMode}
          onClickConfig={handleConfig}
          onClickWordGroup={handleWordGroup}
        />
        <StatusBar
          config={config}
          status={status}
          tracker={tracker}
          timer={timer}
          index={index}
          isLoading={isLoading}
        />
        {!isLoading && (
          <>
            <TypingArea
              status={status}
              tracker={tracker}
              index={index}
              typingAreaKey={typingAreaKey}
              onKeyDown={handleKeyDown}
            />
          </>
        )}
        {!isLoading && status.isDone && (
          <>
            <Results
              config={config}
              status={status}
              tracker={tracker}
              count={count}
              time={time}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
