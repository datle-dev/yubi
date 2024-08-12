import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FaClock, FaA, FaCaretUp, FaCaretDown } from 'react-icons/fa6';
import Button from './Button';

export default function ConfigMenu({
  config,
  wordGroup,
  onClickMode,
  onClickConfig,
  onClickWordGroup,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const wordLists = [
    'hololive-en',
    'project-gutenberg-1k',
    'project-gutenberg-2k',
    'project-gutenberg-5k',
    'project-gutenberg-10k',
    'sindarin',
    'subtitles-1k',
    'subtitles-2k',
    'subtitles-5k',
    'wikipedia-100',
  ]

  function handleOpenMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <section className="flex flex-col gap-2 my-4">
        <div className="flex justify-center gap-4">
          <div className="flex items-center">
            <Button
              icon={<FaClock />}
              text={'time'}
              mode={'time'}
              onClick={onClickMode}
              isActive={config.isTimeMode}
            />
            <Button
              icon={<FaA />}
              text={'word'}
              mode={'word'}
              onClick={onClickMode}
              isActive={config.isWordMode}
            />
          </div>
          {config.isWordMode && (
            <div className="flex items-center">
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
            <div className="flex items-center">
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
        <DropdownMenu.Root onOpenChange={handleOpenMenu} open={isMenuOpen}>
          <div className="flex justify-center">
            <DropdownMenu.Trigger asChild>
              <button type="button" className="flex items-center gap-2 hover:text-sky-200">
                {isMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
                word groups
              </button>
            </DropdownMenu.Trigger>
          </div>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="flex flex-col gap-2 p-4 bg-sky-950 border border-sky-800">
              {wordLists.map((wordList, index) => {
                return (
                  <DropdownMenu.Item key={index} className="font-mono">
                    <Button
                      text={wordList}
                      group={wordList}
                      onClick={onClickWordGroup}
                      isActive={wordGroup === wordList}
                    />
                  </DropdownMenu.Item>
                )
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </section>
    </>
  );
}
