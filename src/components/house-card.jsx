import StarIcon from "@mui/icons-material/Star";
import Carousel from "./carousel";

export default function HomeCard({ rent, images }) {
  return (
    <article className="flex flex-col">
      <section>
        <Carousel images={images} />
      </section>
      <figcaption className="flex flex-row justify-between px-4 py-2">
        <section className="flex flex-col gap-2">
          <aside className="flex flex-col">
            <h4 className="font-semibold text-sm">
              {rent.rent_title}, {rent.rent_location}
            </h4>
            <p className="font-normal text-sm text-[var(--quintanary-color)]">
              Anfitrión
            </p>
            <p className="font-normal text-sm text-[var(--quintanary-color)]">
              {new Date(rent.createdAt).toLocaleDateString()}
            </p>
          </aside>
          <p className="font-semibold text-sm">{rent.rent_price} €</p>
        </section>
        <section className="flex flex-row">
          <StarIcon />
          <p className="font-normal text-sm">4.5</p>
        </section>
      </figcaption>
    </article>
  );
}
