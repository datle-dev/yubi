export default function ConfigOptions({
  isTimedTest,
  isWordsTest,
  onClickHandleConfig,
}) {
  return (
    <>
      {isWordsTest && (
        <div>
          <button
            type="button"
            className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
            words="10"
            onClick={onClickHandleConfig}
          >
            10
          </button>
          <button
            type="button"
            className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
            words="25"
            onClick={onClickHandleConfig}
          >
            25
          </button>
          <button
            type="button"
            className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
            words="50"
            onClick={onClickHandleConfig}
          >
            50
          </button>
          <button
            type="button"
            className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
            words="100"
            onClick={onClickHandleConfig}
          >
            100
          </button>
        </div>
      )}
      {isTimedTest && (
        <div>
          <button
            type="button"
            className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
            duration="15"
            onClick={onClickHandleConfig}
          >
            15
          </button>
          <button
            type="button"
            className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
            duration="30"
            onClick={onClickHandleConfig}
          >
            30
          </button>
          <button
            type="button"
            className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
            duration="60"
            onClick={onClickHandleConfig}
          >
            60
          </button>
          <button
            type="button"
            className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
            duration="120"
            onClick={onClickHandleConfig}
          >
            120
          </button>
        </div>
      )}
    </>
  );
}
