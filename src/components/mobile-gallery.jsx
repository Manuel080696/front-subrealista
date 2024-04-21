import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Carousel from "../components/carousel";

export function MobileGallery({ images, post, navigate }) {
  return (
    <aside className="flex flex-col md:hidden">
      <button
        onClick={() => navigate("/")}
        className="absolute flex flex-col justify-center top-2 left-2 z-20 p-2 bg-white border-0 rounded-full shadow"
      >
        <ArrowBackIosNewIcon sx={{ width: "1rem", height: "1rem" }} />
      </button>
      <Carousel images={images} rent={post[0]} />
    </aside>
  );
}
