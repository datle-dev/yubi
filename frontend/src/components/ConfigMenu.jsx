import Button from './Button';

export default function ConfigMenu({
  config,
  wordGroup,
  onClickReset,
  onClickMode,
  onClickConfig,
  onClickWordGroup,
}) {
  return (
    <>
      <section className="flex flex-col gap-2 my-4">
        <Button text={'reset'} onClick={onClickReset} isActive={false} />
        <div className="flex justify-between gap-4">
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
        <div className="flex justify-center gap-2">
          <Button
            text={'english-100'}
            group={'english-100'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'english-100'}
          />
          <Button
            text={'hololive-en'}
            group={'hololive-en'}
            onClick={onClickWordGroup}
            isActive={wordGroup === 'hololive-en'}
          />
        </div>
      </section>
    </>
  );
}
