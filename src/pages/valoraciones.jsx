import { useContext, useEffect, useState } from "react";
import { getMyRentals } from "../services/get_user_rentals";
import { getRentData } from "../services/get-rent-data";
import { Main } from "../components/main";
import { CurrentUserContext } from "../context/auth-context";
import CarouselValoraciones from "../components/carouselValoraciones";
import { getTenantsRatings } from "../services/get_tenants_ratings";
import CarouselReservas from "../components/carouselReservas";

export function Valoraciones() {
  const [rentals, setRentals] = useState();
  const [error, setError] = useState({});
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState();
  const [ratings, setRatings] = useState();

  const { userData } = useContext(CurrentUserContext);

  const updateRentalsAndPosts = async () => {
    const rentalsData = await getMyRentals();
    if (rentalsData) {
      setRentals(rentalsData.data);
    }
  };
  useEffect(() => {
    const fetchRatings = async () => {
      if (userData) {
        const ratingsData = await getTenantsRatings(userData.username);
        console.log(ratingsData);
        if (ratingsData?.status === "ok") {
          setRatings(ratingsData.data);
        } else {
          setError({
            errorVal: ratingsData.message,
          });
        }
      }
    };

    fetchRatings();

    const fetchRentals = async () => {
      if (!rentals) {
        const rentalsData = await getMyRentals();
        if (rentalsData) {
          setRentals(rentalsData.data);
        } else {
          setError({
            errorRes: "Este usuario todavía no ha hecho ningúna reserva",
          });
        }
      }
    };

    fetchRentals();

    if (rentals && rentals.length !== 0 && posts.length === 0) {
      const fetchPostDataForRentals = async () => {
        const allPosts = [];
        const allImages = [];

        for (const rental of rentals) {
          const postData = await getRentData(rental.rental_rent_id);
          if (postData) {
            allPosts.push(postData.data[0]);
            allImages.push(postData.data[1]);
          }
        }

        setPosts(allPosts);
        setImages(allImages);
      };

      fetchPostDataForRentals();
    }
  }, [rentals, posts?.length, ratings?.length]);

  /*   if (rentals) console.log(rentals);
  if (posts) console.log(posts);
  if (images) console.log(images); */

  return (
    <Main>
      <section className="flex flex-col relative w-screen h-screen overflow-scroll md:max-w-[75rem] md:overflow-hidden">
        <section className="flex flex-col w-full items-center justify-center px-8 gap-12 bg-white md:max-w-[75rem] h-full">
          <aside className="flex flex-col w-full items-center justify-center">
            <h2 className="font-semibold text-2xl pb-2">Reservas</h2>
            {posts?.length !== 0 ? (
              <section className="flex flex-col w-full bg-[--tertiary-color] items-center justify-center  rounded-xl md:flex-row">
                <CarouselReservas
                  images={images}
                  posts={posts}
                  rentals={rentals}
                />
              </section>
            ) : (
              <p>{error?.errorRes}</p>
            )}
          </aside>
          <aside className="flex flex-col w-full items-center justify-center">
            <h2 className="font-semibold text-2xl pb-2">Valoraciones</h2>
            {posts?.length !== 0 ? (
              <section className="flex flex-col w-full bg-[--tertiary-color] items-center justify-center rounded-xl md:flex-row">
                <CarouselValoraciones
                  images={images}
                  posts={posts}
                  rentals={rentals}
                  ratings={ratings}
                  updateRentalsAndPosts={updateRentalsAndPosts}
                />
              </section>
            ) : (
              <p>{error?.errorVal}</p>
            )}
          </aside>
        </section>
        <section></section>
      </section>
    </Main>
  );
}
