export default function WordListButton({ text, list, onClick }) {
  return (
    <button
      type="button"
      className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
      list={list}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
