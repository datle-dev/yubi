export default function ModeButton({ text, mode, onClick, isActive }) {
  return (
    <>
      {isActive ? (
        <button
          type="button"
          className="bg-sky-950 text-sky-200 p-2"
          mode={mode}
          onClick={onClick}
        >
          {text}
        </button>
      ) : (
        <button
          type="button"
          className="bg-sky-950 text-sky-300/50 hover:text-sky-200 p-2"
          mode={mode}
          onClick={onClick}
        >
          {text}
        </button>
      )}
    </>
  );
}
