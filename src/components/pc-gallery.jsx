import CloseIcon from "@mui/icons-material/Close";
import Carousel from "./carousel";

export function PcGallery({ images, active, post, setActive }) {
  return (
    <aside className="hidden md:flex md:flex-col md:mt-5 md:rounded-md relative">
      <ul className="flex flex-row items-center gap-2 md:max-w-[1280px] px-6">
        {/* Mostrar solo la primera imagen grande */}
        {images && images.length > 0 && (
          <li className="w-6/12 h-full">
            <img
              src={images[0].rent_image}
              alt="RentImage"
              className="aspect-square object-cover rounded-l-xl"
            />
          </li>
        )}
        {/* Mostrar las siguientes imágenes en un cuadrado */}
        <li className="grid grid-cols-2 grid-rows-2 gap-2 w-6/12">
          {images &&
            images
              .slice(1, 5)
              .map((image, id) => (
                <img
                  key={id + 1}
                  src={image.rent_image}
                  alt="RentImage"
                  className={`aspect-square object-cover ${
                    id === 1 ? "rounded-tr-xl" : ""
                  } ${id === 3 ? "rounded-br-xl" : ""}`}
                />
              ))}
        </li>
      </ul>
      {images && images.length > 5 ? (
        <button
          className="bg-white rounded-md p-2 absolute bottom-3 right-9 border border-black shadow-xl"
          onClick={() => setActive(!active)}
        >
          Más imágenes
        </button>
      ) : null}
      {active && (
        <section className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <button
            className="absolute top-0 right-0 m-4 text-white"
            onClick={() => setActive(!active)}
          >
            <CloseIcon sx={{ height: "2rem", width: "2rem" }} />
          </button>
          <aside className="relative w-5/12">
            <Carousel images={images} rent={post[0]} />
          </aside>
        </section>
      )}
    </aside>
  );
}
