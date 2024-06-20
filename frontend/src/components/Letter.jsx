export default function Letter({ letter, letterType }) {
  const color = {
    normal: 'text-sky-300/50',
    extra: 'text-red-300',
    correct: 'text-sky-50',
    wrong: 'text-red-400',
  };

  return (
    <>
      <span className={color[letterType]}>{letter}</span>
    </>
  );
}
