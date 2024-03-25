import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed bottom-0 z-50 bg-[var(--primary-color)]">
      <ul className="flex flex-row w-screen justify-center items-center h-16 text-[var(--quintanary-color)] text-xs">
        <li className="w-24 active:text-[var(--quaternary-color)]   ">
          <Link
            to="/search?query"
            className="flex flex-col justify-center items-center h-3/5"
          >
            <img src="/search.svg" alt="search" className="h-6" />
            <p className="my-1 font-thin">Explorar</p>
          </Link>
        </li>
        <li className="w-24 active:text-[var(--quaternary-color)]">
          <Link
            to="/favorites"
            className="flex flex-col justify-center items-center h-3/5"
          >
            <img src="/heart.svg" alt="favorites" className="h-6" />
            <p className="my-1 font-thin">Favoritos</p>
          </Link>
        </li>
        <li className="w-24 active:text-[var(--quaternary-color)] ">
          <Link
            to="/user:id"
            className="w-24 h-full flex flex-col justify-center items-center"
          >
            <img src="/profile.svg" alt="userprofile" className="h-6" />
            <p className="my-1 font-thin">Iniciar Sesión</p>
          </Link>
        </li>
      </ul>
    </header>
  );
}
