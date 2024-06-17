export default function Cursor({
  wordsObject,
  wordIndex,
  letterIndex,
  containerWidth,
}) {
  let prevWordsCharCount = 0;
  let spacesCount = wordIndex;
  let wordRowMap = {};
  let rowOffsets = { 0: 0 };
  let row = 0;
  let sumWidth = 0;

  for (let i = 0; i < wordIndex; i++) {
    prevWordsCharCount += Math.max(
      wordsObject[i].word.length,
      wordsObject[i].typed.length,
    );
  }

  for (let i = 0; i < wordsObject.length; i++) {
    const wordLength = Math.max(
      wordsObject[i].word.length,
      wordsObject[i].typed.length,
    );
    const wordSpacing = (wordLength + 1) * 14.4; // 14.4px per character + one space
    sumWidth += wordSpacing;

    if (sumWidth > containerWidth) {
      row += 1;
      rowOffsets[row] = sumWidth - wordSpacing + rowOffsets[row - 1];
      sumWidth = wordSpacing;
    }

    wordRowMap[i] = row;
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
