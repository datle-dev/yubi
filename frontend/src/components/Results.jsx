import { Tooltip } from 'react-tooltip';

export default function Results({ config, status, tracker, count, time }) {
  let errors = 0;
  let extras = 0;
  let missed = 0;

  for (const entry of tracker) {
    const word = entry.expected;
    const typed = entry.typed;

    if (config.isTimeMode && typed === '') continue;

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

  const wordsTyped = count.typed / 5; // standard to consider a 'word' to be any 5 characters
  const duration = (time.end.getTime() - time.start.getTime()) / 1000 / 60; // ms converted to min
  const rawWpm = wordsTyped / duration;
  const netWpm = (wordsTyped - errors - extras - missed) / duration;
  const percentAccuracy =
    ((count.typed - count.errors - extras - missed) / count.typed) * 100;

  return (
    <>
      {status.isDone && (
        <section className="grid grid-cols-2 text-2xl gap-x-6 my-4 animate-fadein">
          <p className="text-sky-300/50">characters:</p>
          <a
            data-tooltip-id="character"
            data-tooltip-content="correct/error/extra/missed"
          >
            <p className="text-sky-200">
              {count.typed}/{errors}/{extras}/{missed}
            </p>
          </a>
          <Tooltip id="character" place="right" />

          <p className="text-sky-300/50">raw wpm:</p>
          <a
            data-tooltip-id="rawWpm"
            data-tooltip-content={`${rawWpm.toFixed(2)} wpm`}
          >
            <p className="text-sky-200"> {Math.round(rawWpm)}</p>
          </a>
          <Tooltip id="rawWpm" place="right" />

          <p className="text-sky-300/50">net wpm:</p>
          {netWpm > 0 && (
            <>
              <a
                data-tooltip-id="netWpm"
                data-tooltip-content={`${netWpm.toFixed(2)} wpm`}
              >
                <p className="text-sky-200">{Math.round(netWpm)}</p>
              </a>
              <Tooltip id="netWpm" place="right" />
            </>
          )}
          {netWpm <= 0 && (
            <>
              <a data-tooltip-id="invalid" data-tooltip-content="invalid">
                <p className="text-sky-200">invalid</p>
              </a>
              <Tooltip id="invalid" place="right" />
            </>
          )}

          <p className="text-sky-300/50">accuracy:</p>
          <a
            data-tooltip-id="percentAccuracy"
            data-tooltip-content={`${percentAccuracy.toFixed(2)}%`}
          >
            <p className="text-sky-200">{Math.round(percentAccuracy)}%</p>
          </a>
          <Tooltip id="percentAccuracy" place="right" />

          <p className="text-sky-300/50">duration:</p>
          <a
            data-tooltip-id="duration"
            data-tooltip-content={`${(duration * 60).toFixed(2)}s`}
          >
            <p className="text-sky-200">{Math.round(duration * 60)}s</p>
          </a>
          <Tooltip id="duration" place="right" />
        </section>
      )}
    </>
  );
}
