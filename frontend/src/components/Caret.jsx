export default function Caret({
  tracker,
  indexWord,
  indexLetter,
  wordRowMap,
  rowOffsets,
  isStarted,
}) {
  let prevWordsCharCount = 0;
  let spacesCount = indexWord;
  const rowMultiplier = wordRowMap[indexWord] === 0 ? 0 : 1;

  for (let i = 0; i < indexWord; i++) {
    prevWordsCharCount += Math.max(
      tracker[i].expected.length,
      tracker[i].typed.length,
    );
  }

  // need to use style prop and perform CSS calc() operations in template
  // literal, otherwise calc() doesn't resolve
  const style = {
    top: `calc(40px * ${rowMultiplier})`,
    left: `calc(-2px
      + (18px * ${indexLetter})
      + (18px * ${prevWordsCharCount})
      + (18px * ${spacesCount})
      - ${rowOffsets[wordRowMap[indexWord]]}px)`,
  };

  return (
    <div
      className={
        'absolute w-1 h-8 rounded bg-green-300' +
        (isStarted ? '' : ' animate-blink')
      }
      style={style}
    ></div>
  );
}
