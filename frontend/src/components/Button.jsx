export default function Button({
  onClick,
  isActive,
  text = null,
  mode = null,
  group = null,
  duration = null,
  count = null,
}) {
  return (
    <>
      {isActive ? (
        <button
          type="button"
          className="bg-sky-950 text-sky-200 p-2"
          onClick={onClick}
          mode={mode}
          group={group}
          duration={duration}
          count={count}
        >
          {text}
        </button>
      ) : (
        <button
          type="button"
          className="bg-sky-950 text-sky-300/50 hover:text-sky-200 p-2"
          onClick={onClick}
          mode={mode}
          group={group}
          duration={duration}
          count={count}
        >
          {text}
        </button>
      )}
    </>
  );
}
