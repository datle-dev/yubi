import Letter from './Letter';

export default function Word({
  expected,
  typed,
  index,
  indexWord,
  wordRowMap,
}) {
  const maxLength = Math.max(expected.length, typed.length);

  const renderLetters = () => {
    const wordRow = wordRowMap[index];
    const currentRow = wordRowMap[indexWord];

    if (currentRow === 0) {
      if (wordRow > currentRow + 2) {
        return null;
      }
    } else {
      if (wordRow < currentRow - 1 || wordRow > currentRow + 1) {
        return null;
      }
    }

    let letterArray = [];

    for (let i = 0; i < maxLength; i++) {
      if (expected.charAt(i) === '') {
        letterArray.push(
          <Letter key={i} letter={typed.charAt(i)} letterType={'extra'} />,
        );
      } else if (typed.charAt(i) === '') {
        letterArray.push(
          <Letter key={i} letter={expected.charAt(i)} letterType={'normal'} />,
        );
      } else if (expected.charAt(i) === typed.charAt(i)) {
        letterArray.push(
          <Letter key={i} letter={typed.charAt(i)} letterType={'correct'} />,
        );
      } else {
        letterArray.push(
          <Letter key={i} letter={expected.charAt(i)} letterType={'wrong'} />,
        );
      }
    }

    return letterArray;
  };

  return (
    <>
      {renderLetters() !== null && (
        <div className="text-2xl font-mono mr-[14.4px]">{renderLetters()}</div>
      )}
    </>
  );
}
