export default function Letter({ letter, letterType }) {
  const color = {
    normal: 'text-gray-500',
    extra: 'text-amber-500',
    correct: 'text-green-500',
    wrong: 'text-red-500',
  };

  return (
    <>
      <span className={color[letterType]}>{letter}</span>
    </>
  );
}
