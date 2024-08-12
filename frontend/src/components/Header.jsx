import { FaGithub } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";

export default function Header() {
  return (
    <>
      <header
        className="flex w-full
      max-w-3xl justify-between items-center m-4"
      >
        <div className="flex gap-4">
          <h1 className="text-4xl">Yubi</h1>
        </div>
        <div className="flex gap-4">
          <a className="hover:text-sky-50" href="https://github.com/datle-dev/yubi">
          <IconContext.Provider value={{ size: "32px" }}>
            <FaGithub />
          </IconContext.Provider>
          </a>
        </div>
      </header>
    </>
  );
}
