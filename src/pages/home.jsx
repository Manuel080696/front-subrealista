import { useEffect, useState } from "react";
import HouseCard from "../components/house-card";
import { Main } from "../components/main";
import { fetchPosts } from "../hooks/fetch-posts";
import { fetchImages } from "../hooks/fetch-images";
import SearchIcon from "@mui/icons-material/Search";
import { Alert, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function Home({
  filteredPosts,
  setIsOpen,
  isOpen,
  success,
  setSuccess,
}) {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const postsData = await fetchPosts(filteredPosts);
      setPosts(postsData);

      if (postsData.length > 0) {
        const imagesData = await fetchImages(postsData);
        if (imagesData.length !== 0) {
          setImages(imagesData);
        }
      }
    };

    fetchData();
  }, [filteredPosts]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(768));

  return posts?.length ? (
    <Main>
      <section
        className="flex flex-col bg-white fixed top-0 items-center justify-center w-screen mb-5 p-5 border-solid border-b-2 drop-shadow-sm z-10 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <aside className="flex flex-row w-[90%] border-solid border-2 p-2 rounded-full drop-shadow-md bg-white text-black">
          <button className="flex align-center justify-center p-2 rounded-full">
            <SearchIcon className="w-5 h-5 text-black" />
          </button>
          <span className="flex flex-col">
            <h3 className="text-md font-semibold">Cualquier lugar</h3>
            <p className="text-xs">Cualquier semana - añade inquilinos</p>
          </span>
        </aside>
      </section>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-5 mt-24 md:mt-0 md:min-h-screen">
        {images &&
          posts?.map((rent, index) => {
            const rentImages = images[index];
            return (
              <HouseCard key={rent.rent_id} rent={rent} images={rentImages} />
            );
          })}
      </section>
      {success && success?.length !== 0 ? (
        <Stack
          sx={{
            width: isSmallScreen ? "100%" : "60%",
            position: "fixed",
            zIndex: "60",
            bottom: "0",
            right: "0",
            backgroundColor: "white",
          }}
          spacing={2}
        >
          <Alert
            variant="outlined"
            severity="success"
            onClose={() => setSuccess("")}
          >
            {success}
          </Alert>
        </Stack>
      ) : null}
    </Main>
  ) : (
    <Main>
      <section
        className="flex flex-col bg-white fixed top-0 items-center justify-center w-screen mb-5 p-5 border-solid border-b-2 drop-shadow-sm z-10 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <aside className="flex flex-row w-[90%] border-solid border-2 p-2 rounded-full drop-shadow-md bg-white text-black">
          <button className="flex align-center justify-center p-2 rounded-full">
            <SearchIcon className="w-5 h-5 text-black" />
          </button>
          <span className="flex flex-col">
            <h3 className="text-md font-semibold">Cualquier lugar</h3>
            <p className="text-xs">Cualquier semana - añade inquilinos</p>
          </span>
        </aside>
      </section>
      <p className="mt-24">There are no posts yet...</p>
      {success && success?.length !== 0 ? (
        <Stack
          sx={{
            width: isSmallScreen ? "100%" : "60%",
            position: "fixed",
            zIndex: "60",
            bottom: "0",
            right: "0",
            backgroundColor: "white",
          }}
          spacing={2}
        >
          <Alert
            variant="outlined"
            severity="success"
            onClose={() => setSuccess("")}
          >
            {success}
          </Alert>
        </Stack>
      ) : null}
    </Main>
  );
}
