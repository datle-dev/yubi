export default function TimeDurationButton({ text, duration, onClick }) {
  return (
    <button
      type="button"
      className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
      duration={duration}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
