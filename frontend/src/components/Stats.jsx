export default function Stats({
  wordsObject,
  typedCharacters,
  typedErrors,
  startTime,
  endTime,
}) {
  let errors = 0;
  let extras = 0;
  let missed = 0;

  for (const entry of wordsObject) {
    const word = entry.word;
    const typed = entry.typed;

    const maxLength = Math.max(word.length, typed.length);

    for (let i = 0; i < maxLength; i++) {
      if (word.charAt(i) === '') {
        extras += 1;
      } else if (typed.charAt(i) === '') {
        missed += 1;
      } else if (word.charAt(i) !== typed.charAt(i)) {
        errors += 1;
      }
    }
  }

  const wordsTyped = typedCharacters / 5; // standard to consider a 'word' to be any 5 characters
  const duration = (endTime.getTime() - startTime.getTime()) / 1000 / 60; // ms converted to min
  const rawWpm = Math.round(wordsTyped / duration);
  const netWpm = Math.round((wordsTyped - errors - extras - missed) / duration);
  const percentAccuracy = Math.round(
    ((typedCharacters - typedErrors - extras - missed) / typedCharacters) * 100,
  );

  return (
    <>
      <div>
        <p>Test completed!</p>
        <p>
          {typedCharacters}/{errors}/{extras}/{missed}
        </p>
        <p>raw wpm: {rawWpm}</p>
        {netWpm > 0 && <p>net wpm: {netWpm}</p>}
        {netWpm <= 0 && <p>net wpm: Invalid</p>}
        <p>accuracy: {percentAccuracy}%</p>
      </div>
    </>
  );
}
