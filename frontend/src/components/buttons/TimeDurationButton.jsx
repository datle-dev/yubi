export default function TimeDurationButton({ text, duration, onClick }) {
  return (
    <button
      type="button"
      className="bg-sky-950 text-sky-300/50 hover:text-sky-200 p-2"
      duration={duration}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
