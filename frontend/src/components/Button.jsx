export default function Button({
  onClick,
  isActive,
  icon = null,
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
          className="flex items-center gap-2 bg-sky-950 text-sky-200 p-2"
          onClick={onClick}
          mode={mode}
          group={group}
          duration={duration}
          count={count}
        >
          {icon}
          {text}
        </button>
      ) : (
        <button
          type="button"
          className="flex items-center gap-2 bg-sky-950 text-sky-300/50 hover:text-sky-200 p-2"
          onClick={onClick}
          mode={mode}
          group={group}
          duration={duration}
          count={count}
        >
          {icon}
          {text}
        </button>
      )}
    </>
  );
}
