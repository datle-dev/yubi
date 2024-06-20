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

  const offset = rowOffsets[wordRowMap[indexWord]];
  const style = {
    top: 0,
    left: 0,
    transform: `translate(
      calc(-2px
      + (18px * ${indexLetter})
      + (18px * ${prevWordsCharCount})
      + (18px * ${spacesCount}) - ${offset}px),
      calc(40px * ${rowMultiplier})
    )`,
    transition: 'transform 50ms linear',
  };

  return (
    <div
      className={
        'absolute w-1 h-8 rounded bg-yellow-500' +
        (isStarted ? '' : ' animate-blink')
      }
      style={style}
    ></div>
  );
}
