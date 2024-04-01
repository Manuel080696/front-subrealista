import { useEffect, useState } from "react";
import HouseCard from "../components/house-card";
import { Main } from "../components/main";
import { getAllPosts } from "../services/get-all-posts";
import { getAllImages } from "../services/get-all-images";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);

  async function fetchAllPosts() {
    const result = await getAllPosts();

    setPosts(result);
  }

  async function fetchAllImages() {
    const result = await getAllImages();
    setImages(result);
  }

  useEffect(() => {
    fetchAllPosts();
    fetchAllImages();
  }, []);

  return posts?.length ? (
    <Main>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-5">
        {posts?.map((rent) => {
          // Filtrar las imágenes que coinciden con el rent_id actual
          const rentImages = images?.filter(
            (image) => image.rent_id === rent.rent_id
          );
          return (
            <HouseCard
              key={rent.rent_id}
              rent={rent}
              images={rentImages?.length ? rentImages : null}
            />
          );
        })}
      </section>
    </Main>
  ) : (
    <p>Tehre are no posts yet...</p>
  );
}
