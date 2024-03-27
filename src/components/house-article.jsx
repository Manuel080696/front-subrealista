import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ImagesCarrusel from "./images-carrusel";

export default function HouseArticle() {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/rent:id");
  };

  return (
    <article className="flex flex-col gap-4">
      <ImagesCarrusel />
      <figcaption className="flex flex-row justify-between">
        <section className="flex flex-col gap-2">
          <aside className="flex flex-col">
            <h4 className="font-semibold text-sm">Localización</h4>
            <p className="font-normal text-sm text-[var(--quintanary-color)]">
              Anfitrión
            </p>
            <p className="font-normal text-sm text-[var(--quintanary-color)]">
              Fecha
            </p>
          </aside>
          <p className="font-semibold text-sm">Precio €</p>
        </section>
        <section className="flex flex-row">
          <StarIcon />
          <p className="font-normal text-sm">4.5</p>
        </section>
      </figcaption>
    </article>
  );
}
