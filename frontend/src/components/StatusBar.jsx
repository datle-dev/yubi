export default function StatusBar({
  config,
  status,
  tracker,
  timer,
  index,
  isLoading,
}) {
  return (
    <div className="mt-8 mb-4">
      {!status.isStarted && !isLoading && (
        <p className="animate-fadein text-2xl">type to begin</p>
      )}
      {config.isWordMode &&
        status.isStarted &&
        !status.isDone &&
        !isLoading && (
          <p className="animate-fadein text-2xl">
            {index.word}/{tracker.length}
          </p>
        )}
      {config.isTimeMode &&
        status.isStarted &&
        !status.isDone &&
        !isLoading && <p className="animate-fadein text-2xl">{timer}s</p>}
      {status.isDone && !isLoading && (
        <p className="animate-fadein text-2xl">
          finished! type
          <kbd className="rounded text-sky-950 bg-sky-300/50 mx-2 px-1 py-0.5">
            enter
          </kbd>
          to reset
        </p>
      )}
      {isLoading && <p className="animate-fadein text-2xl">loading...</p>}
    </div>
  );
}
