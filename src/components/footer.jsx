import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";

export function Footer() {
  return (
    <footer className="px-5 sticky pb-16 z-0 w-full bg-[var(--secondary-color)] md:bottom-0 md:pb-0 md:static md:px-0">
      {/*Apartado about, privacidad, condiciones de uso*/}
      <section className="py-5 flex flex-col-reverse gap-7 border-solid border-t-2">
        <nav className="flex items-center justify-start text-xs font-normal md:items-center md:justify-center">
          <span className="flex flex-col gap-x-1 gap-1 md:flex-row md:gap-x-2">
            <p>© 2024 Subrealista, Inc.</p>
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/condiciones">Condiciones</Link>
            <Link to="/about">Datos de la empresa</Link>
          </span>
        </nav>

        {/*Apartado redes sociales y lenguaje */}
        <nav className="flex flex-row items-center jutify-center w-full text-xs font-normal justify-between md:justify-center md:gap-x-5">
          <span className="flex flex-row items-center">
            <LanguageIcon className="mx-1" />
            <p className="text-center h-full">Español (ES)</p>
          </span>
          <span className="flex flex-row items-center gap-3">
            <Link to="#">
              <FacebookIcon sx={{ fontSize: "2rem" }} />
            </Link>
            <Link to="#">
              <TwitterIcon sx={{ fontSize: "2rem" }} />
            </Link>
            <Link to="#">
              <InstagramIcon sx={{ fontSize: "2rem" }} />
            </Link>
          </span>
        </nav>
      </section>
    </footer>
  );
}

export default Footer;
