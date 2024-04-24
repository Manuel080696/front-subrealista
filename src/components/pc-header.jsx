import { Link } from "react-router-dom";
import Search from "./search";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountMenu from "./account-menu";
import MenuIcon from "@mui/icons-material/Menu";

export const HeaderPc = ({
  handleFilteredPosts,
  userData,
  active,
  setActive,
  isHomePage,
  user,
}) => {
  return userData === null ? (
    <header className="hidden md:flex md:min-h-min md:w-full md:h-min md:fixed md:bottom-0 md:z-50 md:bg-[var(--primary-color)] md:top-0 md:sticky md:pt-2 md:pb-5 md:border-solid md:border-b-2 md:drop-shadow-sm">
      <nav className="md:flex md:flex-col md:w-screen md:px-20 md:items-center md:h-min md:text-[var(--quintanary-color)] md:text-xs md:gap-y-1">
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
        <section
          className={
            isHomePage
              ? "flex flex-col justify-center items-center min-w-[42rem] w-6/12 z-10 pt-5"
              : "hidden"
          }
        >
          <Search handleFilteredPosts={handleFilteredPosts} />
        </section>
      </nav>
    </header>
  ) : (
    <header className="min-h-min w-full h-min fixed bottom-0 z-50 bg-[var(--primary-color)] md:top-0 md:sticky md:pt-2 md:pb-5 md:border-solid md:border-b-2 md:drop-shadow-sm">
      <nav className="hidden md:flex md:flex-col md:w-screen md:px-20 md:items-center md:h-min md:text-[var(--quintanary-color)] md:text-xs md:gap-y-1">
        <section className="flex flex-row justify-between items-center w-full">
          <Link
            to="/"
            onClick={() => handleFilteredPosts([])}
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
        <section
          className={
            isHomePage
              ? "flex flex-col justify-center items-center min-w-[42rem] w-6/12 z-10 pt-5"
              : "hidden"
          }
        >
          <Search handleFilteredPosts={handleFilteredPosts} />
        </section>
      </nav>
    </header>
  );
};
