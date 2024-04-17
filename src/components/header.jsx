import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../context/auth-context";
import { HeaderMobile } from "./mobile-header";
import { HeaderPc } from "./pc-header";
import { useLocation } from "react-router-dom";

export function Header({ handleFilteredPosts, isOpen, setIsOpen }) {
  const [active, setActive] = useState(false);
  const { user, userData } = useContext(CurrentUserContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <HeaderMobile
      handleFilteredPosts={handleFilteredPosts}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      user={user}
    />
  ) : (
    <HeaderPc
      handleFilteredPosts={handleFilteredPosts}
      userData={userData}
      active={active}
      setActive={setActive}
      user={user}
      isHomePage={isHomePage && isHomePage}
    />
  );
}

export default Header;
