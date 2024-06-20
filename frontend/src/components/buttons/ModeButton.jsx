export default function ModeButton({ text, mode, onClick }) {
  return (
    <button
      type="button"
      className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
      mode={mode}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
