import { useCallback, useEffect, useState } from "react";
import HouseCard from "../components/house-card";
import { Main } from "../components/main";
import { getAllPosts } from "../services/get-all-posts";
import { getAllImages } from "../services/get-all-images";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [postsID, setPostsID] = useState([]);
  const [images, setImages] = useState([]);

  const fetchAllPosts = useCallback(async () => {
    const result = await getAllPosts();
    if (result?.status === "ok") {
      setPosts(result?.data);

      // Obtener todas las imágenes para cada publicación de forma concurrente
      const promises = result.data.map(async (rent) => {
        const imagesResult = await getAllImages(rent?.rent_id);

        if (imagesResult?.status === "ok") {
          return {
            rentId: rent?.rent_id,
            images: imagesResult?.data[1],
          };
        }
        return null;
      });

      // Esperar a que todas las promesas se resuelvan
      const imagesData = await Promise.all(promises);

      // Filtrar y eliminar elementos nulos o duplicados
      const uniqueImagesData = imagesData.filter(
        (item, index, self) =>
          item && index === self.findIndex((t) => t?.rentId === item?.rentId)
      );

      // Establecer el estado de imágenes con los datos únicos
      setImages(uniqueImagesData);
    }
  }, []);

  if (posts && postsID <= posts.length) {
    posts?.map((rent) => {
      postsID.push(rent.rent_id);
    });
  }

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return posts?.length ? (
    <Main>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-5">
        {posts?.map((rent) => {
          const rentImages = images.find(
            (item) => item.rentId === rent.rent_id
          );

          return (
            <HouseCard
              key={rent.rent_id}
              rent={rent}
              images={rentImages?.length !== 0 ? rentImages : null}
            />
          );
        })}
      </section>
    </Main>
  ) : (
    <p>Tehre are no posts yet...</p>
  );
}
