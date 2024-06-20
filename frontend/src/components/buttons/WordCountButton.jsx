export default function WordCountButton({ text, count, onClick }) {
  return (
    <button
      type="button"
      className="border rounded bg-blue-500 hover:bg-blue-700 text-white p-2"
      count={count}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
