import Letter from './Letter';

export default function Word({ word, typed, index, wordIndex, wordRowMap }) {
  const maxLength = Math.max(word.length, typed.length);

  const renderLetters = () => {
    const wordRow = wordRowMap[index];
    const currentRow = wordRowMap[wordIndex];

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
      if (word.charAt(i) === '') {
        letterArray.push(
          <Letter key={i} letter={typed.charAt(i)} letterType={'extra'} />,
        );
      } else if (typed.charAt(i) === '') {
        letterArray.push(
          <Letter key={i} letter={word.charAt(i)} letterType={'normal'} />,
        );
      } else if (word.charAt(i) === typed.charAt(i)) {
        letterArray.push(
          <Letter key={i} letter={typed.charAt(i)} letterType={'correct'} />,
        );
      } else {
        letterArray.push(
          <Letter key={i} letter={word.charAt(i)} letterType={'wrong'} />,
        );
      }
    }

    return letterArray;
  };

  return (
    <>
      <div className="text-2xl font-mono mr-[14.4px]">{renderLetters()}</div>
    </>
  );
}
