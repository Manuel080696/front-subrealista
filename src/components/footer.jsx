import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="px-5 fixed bottom-16 z-0 w-full gap-7 bg-[var(--secondary-color)]">
      <section className="py-5 flex flex-col-reverse z-0 w-full gap-7 bg-[var(--secondary-color)] border-solid border-t-2">
        <nav className="flex items-center jutify-center w-full text-xs font-thin">
          <span className="flex flex-col gap-x-1 gap-1">
            <p>© 2024 Subrealista, Inc.</p>
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/condiciones">Condiciones</Link>
            <Link to="/about">Datos de la empresa</Link>
          </span>
        </nav>

        <nav className="flex flex-row items-center jutify-center w-full text-xs font-thin justify-between">
          <span className="flex flex-row items-center">
            <img src="/language.svg" alt="idioma" className="h-full mx-1" />
            <p className="text-center h-full">Español (ES)</p>
          </span>
          <span className="flex flex-row items-center gap-3">
            <Link to="#">
              <img src="/facebook.svg" alt="facebook" />
            </Link>
            <Link to="#">
              <img src="/twitter.svg" alt="twitter" />
            </Link>
            <Link to="#">
              <img src="instagram.svg" alt="instagram" />
            </Link>
          </span>
        </nav>
      </section>
    </footer>
  );
}
