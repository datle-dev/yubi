export default function WordListButton({ text, list, onClick }) {
  return (
    <button
      type="button"
      className="bg-sky-950 text-sky-300/50 hover:text-sky-200 p-2"
      list={list}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
