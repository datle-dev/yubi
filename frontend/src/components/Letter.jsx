export default function Letter({ letter, letterType }) {
  return (
    <>
      <span className={letterType}>{letter}</span>
    </>
  );
}
