import { useState, useEffect, useRef } from 'react';
import Word from './Word';
import Caret from './Caret.jsx';

export default function TypingTest({ status, tracker, index, typingAreaKey }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [wordRowMap, setWordRowMap] = useState({});

  useEffect(() => {
    setWidth(ref.current.offsetWidth);

    const getWidth = () => {
      setWidth(ref.current.offsetWidth);
    };

    window.addEventListener('resize', getWidth);

    return () => window.removeEventListener('resize', getWidth);
  }, []);

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
      <section className="flex flex-col gap-2 justify-center items-center mt-4 mb-8">
        <div
          key={typingAreaKey}
          ref={ref}
          className="relative flex justify-start content-start flex-wrap max-w-3xl min-h-32 animate-fadein"
          style={{ visibility: status.isLoading ? 'hidden' : 'visible' }}
        >
          {!status.isDone && (
            <Caret
              tracker={tracker}
              indexWord={index.word}
              indexLetter={index.letter}
              wordRowMap={wordRowMap}
              rowOffsets={rowOffsets}
              isStarted={status.isStarted}
            />
          )}
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
    </>
  );
}
