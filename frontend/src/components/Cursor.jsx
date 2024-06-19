export default function Cursor({
  wordsObject,
  wordIndex,
  letterIndex,
  wordRowMap,
  rowOffsets,
}) {
  let prevWordsCharCount = 0;
  let spacesCount = wordIndex;

  for (let i = 0; i < wordIndex; i++) {
    prevWordsCharCount += Math.max(
      wordsObject[i].word.length,
      wordsObject[i].typed.length,
    );
  }

  // need to use style prop and perform CSS calc() operations in template
  // literal, otherwise calc() doesn't resolve
  const style = {
    top: `calc(32px * ${wordRowMap[wordIndex]})`,
    left: `calc(-2px
      + (14.4px * ${letterIndex})
      + (14.4px * ${prevWordsCharCount})
      + (14.4px * ${spacesCount})
      - ${rowOffsets[wordRowMap[wordIndex]]}px)`,
  };

  return (
    <div
      className="absolute w-1 h-8 rounded animate-blink bg-gray-500"
      style={style}
    ></div>
  );
}
