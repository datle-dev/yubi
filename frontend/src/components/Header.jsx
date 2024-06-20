export default function Header() {
  return (
    <>
      <header
        className="flex w-full
      max-w-3xl justify-between items-center px-4 py-4"
      >
        <div className="flex gap-4">
          <h1 className="text-4xl">Yubi</h1>
        </div>
        <div className="flex gap-4">
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
        </div>
      </header>
    </>
  );
}
