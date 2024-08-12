import { useState, useEffect, useRef } from 'react';
import { FaArrowPointer } from "react-icons/fa6";
import Word from './Word';
import Caret from './Caret.jsx';

export default function TypingTest({ status, tracker, index, typingAreaKey, onKeyDown }) {
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
      <section className="flex flex-col gap-2 justify-center items-center my-4">
        <div
          key={typingAreaKey}
          ref={ref}
          className="peer relative flex justify-start content-start flex-wrap max-w-3xl min-h-32 animate-fadein blur focus:blur-none"
          style={{ visibility: status.isLoading ? 'hidden' : 'visible' }}
          onKeyDown={onKeyDown}
          tabIndex="0"
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
        <p className="flex items-center gap-2 text-2xl text-sky-200 absolute pointer-events-none peer-focus:invisible"><FaArrowPointer /> Click here to focus</p>
      </section>
    </>
  );
}
