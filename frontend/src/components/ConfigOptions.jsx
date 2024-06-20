import TimeDurationButton from './buttons/TimeDurationButton';
import WordCountButton from './buttons/WordCountButton';

export default function ConfigOptions({ isTimeMode, isWordMode, onClick }) {
  return (
    <>
      {isWordsTest && (
        <div>
          <WordCountButton text={'10'} count={'10'} onClick={onClick} />
          <WordCountButton text={'25'} count={'25'} onClick={onClick} />
          <WordCountButton text={'50'} count={'50'} onClick={onClick} />
          <WordCountButton text={'100'} count={'100'} onClick={onClick} />
        </div>
      )}
      {isTimedTest && (
        <div>
          <TimeDurationButton text={'15'} duration={'15'} onClick={onClick} />
          <TimeDurationButton text={'30'} duration={'30'} onClick={onClick} />
          <TimeDurationButton text={'60'} duration={'60'} onClick={onClick} />
          <TimeDurationButton text={'120'} duration={'120'} onClick={onClick} />
        </div>
      )}
    </>
  );
}
