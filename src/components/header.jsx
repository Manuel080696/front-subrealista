import { Link } from "react-router-dom";
import Search from "./search";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountMenu from "./account-menu";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../context/auth-context";
import { SearchMobile } from "./search-mobile";

export function Header({ handleFilteredPosts, isOpen, setIsOpen }) {
  const [active, setActive] = useState(false);
  const { user, userData } = useContext(CurrentUserContext);

  return userData === null ? (
    <header className="min-h-min w-full h-min fixed bottom-0 z-50 bg-[var(--primary-color)] md:top-0 md:sticky md:pt-2 md:pb-5 md:border-solid md:border-b-2 md:drop-shadow-sm">
      {/*Header de móvil*/}
      <ul className="flex flex-row w-screen justify-center items-center h-16 text-[var(--quintanary-color)] text-xs md:hidden">
        <li className="w-24 active:text-[var(--quaternary-color)]   ">
          <Link
            to="/"
            onClick={() => handleFilteredPosts("")}
            className="flex flex-col justify-center items-center h-3/5"
          >
            <SearchIcon className="text-gray" />
            <p className="my-1 font-light">Explorar</p>
          </Link>
        </li>
        <li className="w-24 active:text-[var(--quaternary-color)]">
          <Link
            to="/login"
            className="flex flex-col justify-center items-center h-3/5"
          >
            <FavoriteBorderIcon className="text-gray" />
            <p className="my-1 font-light">Favoritos</p>
          </Link>
        </li>
        <li className="w-24 active:text-[var(--quaternary-color)] ">
          <Link
            to="/register"
            className="w-24 h-full flex flex-col justify-center items-center"
          >
            <AccountCircleOutlinedIcon className="text-gray" />
            <p className="my-1 font-light">Iniciar Sesión</p>
          </Link>
        </li>
      </ul>
      <section className="absolute">
        <SearchMobile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleFilteredPosts={handleFilteredPosts}
        />
      </section>

      {/*Header de PC*/}
      <nav className="hidden md:flex md:flex-col md:w-screen md:px-20 md:items-center md:h-min md:text-[var(--quintanary-color)] md:text-xs md:gap-y-1">
        <section className="flex flex-row justify-between items-center w-full">
          <Link
            to="/"
            onClick={() => handleFilteredPosts("")}
            className="flex flex-col justify-center items-center h-3/5"
          >
            <img src="/logo/logo.webp" alt="search" className="w-24" />
          </Link>
          <button
            onClick={() => setActive(!active)}
            className={`flex flex-row h-10 px-3 py-6 gap-2 border border-zinc-400 rounded-full justify-center items-center relative bg-white z-20 ${
              active ? "drop-shadow-lg" : "hover:drop-shadow-lg"
            }`}
          >
            <MenuIcon sx={{ fontSize: "1.5rem" }} />
            <AccountCircleIcon sx={{ fontSize: "2.5rem" }} />
            <AccountMenu active={active} user={user} />
          </button>
        </section>
        <section className="flex flex-col justify-center items-center min-w-min w-6/12 z-10">
          <Search handleFilteredPosts={handleFilteredPosts} />
        </section>
      </nav>
    </header>
  ) : (
    <header className="min-h-min w-full h-min fixed bottom-0 z-50 bg-[var(--primary-color)] md:top-0 md:sticky md:pt-2 md:pb-5 md:border-solid md:border-b-2 md:drop-shadow-sm">
      {/*Header de móvil*/}
      <ul className="flex flex-row w-screen justify-center items-center h-16 text-[var(--quintanary-color)] text-xs md:hidden">
        <li className="w-24 active:text-[var(--quaternary-color)]   ">
          <Link
            to="/"
            className="flex flex-col justify-center items-center h-3/5"
          >
            <SearchIcon className="text-gray" />
            <p className="my-1 font-light">Explorar</p>
          </Link>
        </li>
        <li className="w-24 active:text-[var(--quaternary-color)]">
          <Link
            to="/favorites"
            className="flex flex-col justify-center items-center h-3/5"
          >
            <FavoriteBorderIcon className="text-gray" />
            <p className="my-1 font-light">Favoritos</p>
          </Link>
        </li>
        <li className="w-24 active:text-[var(--quaternary-color)] ">
          <Link
            to={`/users/${user?.username}`}
            className="w-24 h-full flex flex-col justify-center items-center"
          >
            <Avatar
              alt="Foto de perfil"
              src={userData?.profilePic}
              sx={{ width: 24, height: 24 }}
            />
            <p className="my-1 font-light">Iniciar Sesión</p>
          </Link>
        </li>
      </ul>
      <SearchMobile
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleFilteredPosts={handleFilteredPosts}
      />

      {/*Header de PC*/}
      <nav className="hidden md:flex md:flex-col md:w-screen md:px-20 md:items-center md:h-min md:text-[var(--quintanary-color)] md:text-xs md:gap-y-1">
        <section className="flex flex-row justify-between items-center w-full">
          <Link
            to="/"
            onClick={() => handleFilteredPosts("")}
            className="flex flex-col justify-center items-center h-3/5"
          >
            <img src="/logo/logo.webp" alt="search" className="w-24" />
          </Link>
          <button
            onClick={() => setActive(!active)}
            className={`flex flex-row h-10 px-3 py-6 gap-2 border border-zinc-400 rounded-full justify-center items-center relative bg-white z-20 ${
              active ? "drop-shadow-lg" : "hover:drop-shadow-lg"
            }`}
          >
            <MenuIcon sx={{ fontSize: "1.5rem" }} />
            <Avatar alt="Foto de perfil" src={userData?.profilePic} />
            <AccountMenu active={active} user={user} />
          </button>
        </section>
        <section className="flex flex-col justify-center items-center min-w-[42rem] w-6/12 z-10 pt-5">
          <Search handleFilteredPosts={handleFilteredPosts} />
        </section>
      </nav>
    </header>
  );
}

export default Header;
