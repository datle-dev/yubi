import { FaClock, FaA } from "react-icons/fa6";
import Button from './Button';

export default function ConfigMenu({
  config,
  wordGroup,
  onClickMode,
  onClickConfig,
  onClickWordGroup,
}) {
  return (
    <>
      <section className="flex flex-col gap-2 my-4">
        <Button text={'reset'} onClick={onClickReset} isActive={false} />
        <div className="flex justify-center gap-4">
          <div>
            <Button
              text={'time'}
              mode={'time'}
              onClick={onClickMode}
              isActive={config.isTimeMode}
            />
            <Button
              text={'word'}
              mode={'word'}
              onClick={onClickMode}
              isActive={config.isWordMode}
            />
          </div>
          {config.isWordMode && (
            <div>
              <Button
                text={'10'}
                count={'10'}
                onClick={onClickConfig}
                isActive={config.wordModeCount === 10}
              />
              <Button
                text={'25'}
                count={'25'}
                onClick={onClickConfig}
                isActive={config.wordModeCount === 25}
              />
              <Button
                text={'50'}
                count={'50'}
                onClick={onClickConfig}
                isActive={config.wordModeCount === 50}
              />
              <Button
                text={'100'}
                count={'100'}
                onClick={onClickConfig}
                isActive={config.wordModeCount === 100}
              />
            </div>
          )}
          {config.isTimeMode && (
            <div>
              <Button
                text={'15'}
                duration={'15'}
                onClick={onClickConfig}
                isActive={config.timeModeDuration === 15}
              />
              <Button
                text={'30'}
                duration={'30'}
                onClick={onClickConfig}
                isActive={config.timeModeDuration === 30}
              />
              <Button
                text={'60'}
                duration={'60'}
                onClick={onClickConfig}
                isActive={config.timeModeDuration === 60}
              />
              <Button
                text={'120'}
                duration={'120'}
                onClick={onClickConfig}
                isActive={config.timeModeDuration === 120}
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap max-w-3xl justify-center gap-2">
          <Button
            text={'hololive-en'}
            group={'hololive-en'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'hololive-en'}
          />
          <Button
            text={'project-gutenberg-1k'}
            group={'project-gutenberg-1k'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'project-gutenberg-1k'}
          />
          <Button
            text={'project-gutenberg-2k'}
            group={'project-gutenberg-2k'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'project-gutenberg-2k'}
          />
          <Button
            text={'project-gutenberg-5k'}
            group={'project-gutenberg-5k'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'project-gutenberg-5k'}
          />
          <Button
            text={'project-gutenberg-10k'}
            group={'project-gutenberg-10k'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'project-gutenberg-10k'}
          />
          <Button
            text={'sindarin'}
            group={'sindarin'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'sindarin'}
          />
          <Button
            text={'subtitles-1k'}
            group={'subtitles-1k'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'subtitles-1k'}
          />
          <Button
            text={'subtitles-2k'}
            group={'subtitles-2k'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'subtitles-2k'}
          />
          <Button
            text={'subtitles-5k'}
            group={'subtitles-5k'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'subtitles-5k'}
          />
          <Button
            text={'wikipedia-100'}
            group={'wikipedia-100'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'wikipedia-100'}
          />
        </div>
      </section>
    </>
  );
}
