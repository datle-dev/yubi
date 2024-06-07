import Letter from './Letter';

export default function Word({ word, typed }) {
  const maxLength = Math.max(word.length, typed.length);

  const renderLetters = () => {
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
      <div>{renderLetters()}</div>
    </>
  );
}
