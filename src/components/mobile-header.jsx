import { Link } from "react-router-dom";
import { SearchMobile } from "./search-mobile";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Avatar from "@mui/material/Avatar";

export const HeaderMobile = ({
  handleFilteredPosts,
  isOpen,
  setIsOpen,
  userData,
  user,
}) => {
  return userData === null ? (
    <header className="min-h-min w-full h-min fixed bottom-0 z-50 border-t bg-[var(--primary-color)] md:hidden md:top-0 md:sticky md:pt-2 md:pb-5 md:border-solid md:border-b-2 md:drop-shadow-sm">
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
    </header>
  ) : (
    <header className="min-h-min w-full h-min fixed border-t bottom-0 z-50 bg-[var(--primary-color)] md:top-0 md:sticky md:pt-2 md:pb-5 md:border-solid md:border-b-2 md:drop-shadow-sm">
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
      <section className="absolute">
        <SearchMobile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleFilteredPosts={handleFilteredPosts}
        />
      </section>
    </header>
  );
};
