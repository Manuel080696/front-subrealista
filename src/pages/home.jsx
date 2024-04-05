import { useEffect, useState } from "react";
import HouseCard from "../components/house-card";
import { Main } from "../components/main";
import { fetchPosts } from "../hooks/fetch-posts";
import { fetchImages } from "../hooks/fetch-images";
export default function Home({ filteredPosts }) {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const postsData = await fetchPosts(filteredPosts);
      setPosts(postsData);

      if (postsData.length > 0) {
        const imagesData = await fetchImages(postsData);
        setImages(imagesData);
      }
    };

    fetchData();
  }, [filteredPosts]);

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
