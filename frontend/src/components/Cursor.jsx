export default function Cursor({ wordsObject, wordIndex, letterIndex }) {
  let prevWordsCharCount = 0;
  let spacesCount = wordIndex;

  for (let i = 0; i < wordIndex; i++) {
    prevWordsCharCount += Math.max(
      wordsObject[i].word.length,
      wordsObject[i].typed.length,
    );
  }

  const style = {
    top: '0px',
    left: `calc(6px
      + (14.4px * ${letterIndex})
      + (14.4px * ${prevWordsCharCount})
      + (8px * ${spacesCount}))`,
  };

  return (
    <div
      className="relative w-1 h-8 rounded animate-blink bg-gray-500"
      style={style}
    ></div>
  );
}
