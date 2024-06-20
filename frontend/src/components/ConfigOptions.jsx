import TimeDurationButton from './buttons/TimeDurationButton';
import WordCountButton from './buttons/WordCountButton';

export default function ConfigOptions({
  isWordMode,
  isTimeMode,
  timeModeDuration,
  wordModeCount,
  onClick,
}) {
  return (
    <>
      {isWordMode && (
        <div>
          <WordCountButton
            text={'10'}
            count={'10'}
            onClick={onClick}
            isActive={wordModeCount === 10}
          />
          <WordCountButton
            text={'25'}
            count={'25'}
            onClick={onClick}
            isActive={wordModeCount === 25}
          />
          <WordCountButton
            text={'50'}
            count={'50'}
            onClick={onClick}
            isActive={wordModeCount === 50}
          />
          <WordCountButton
            text={'100'}
            count={'100'}
            onClick={onClick}
            isActive={wordModeCount === 100}
          />
        </div>
      )}
      {isTimeMode && (
        <div>
          <TimeDurationButton
            text={'15'}
            duration={'15'}
            onClick={onClick}
            isActive={timeModeDuration === 15}
          />
          <TimeDurationButton
            text={'30'}
            duration={'30'}
            onClick={onClick}
            isActive={timeModeDuration === 30}
          />
          <TimeDurationButton
            text={'60'}
            duration={'60'}
            onClick={onClick}
            isActive={timeModeDuration === 60}
          />
          <TimeDurationButton
            text={'120'}
            duration={'120'}
            onClick={onClick}
            isActive={timeModeDuration === 120}
          />
        </div>
      )}
    </>
  );
}
