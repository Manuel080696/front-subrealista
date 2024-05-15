import { useEffect, useState } from "react";
import CarouselComents from "./carousel-comments";
import { useParams } from "react-router-dom";
import { getUserDataService } from "../services/get-user";
import { getOwnersRatings } from "../services/get-owners-ratings";

export function OwnerComents({ user, post }) {
  const [ratings, setRatings] = useState([]);
  const [tenant, setTenant] = useState();
  const { username } = useParams();
  useEffect(() => {
    try {
      if (user || post) {
        const fetchTenantsRatingsData = async () => {
          const ratingsData = await getOwnersRatings(
            post ? post.rent_owner : user.username
          );
          if (ratingsData !== undefined && ratingsData?.status === "ok") {
            setRatings(ratingsData.data);
          }
        };

        fetchTenantsRatingsData();
      }
    } catch {
      console.error("Este usuario no tiene comentarios");
    }

    const fetchUserData = async () => {
      const allTenants = [];

      if (ratings) {
        for (const rating of ratings) {
          const tenantData = await getUserDataService(rating?.tenant);
          if (tenantData && tenantData?.status === "ok") {
            allTenants.push(tenantData);
          }
        }
      }
      setTenant(allTenants);
    };

    fetchUserData();
  }, [user, post]);

  return ratings && ratings?.length !== 0 ? (
    <aside
      className={`flex flex-col py-6 pb-8 gap-2 bg-[--tertiary-color] w-full max-w-full ${
        user ? "md:max-w-[50%]" : "md:max-w-full"
      }`}
    >
      <h3
        className={`text-2xl font-bold mb-5 ${
          username?.length !== 0 ? "pl-6 " : ""
        }`}
      >
        {`${
          username?.length > 0
            ? `Valoraciones para ${username}`
            : "Valoraciones de tu anfitrión"
        }`}
      </h3>

      <CarouselComents ratings={ratings} tenant={tenant} />
    </aside>
  ) : (
    <aside
      className={`flex flex-col py-6 pb-8 gap-2 bg-[--tertiary-color] w-full max-w-full ${
        user ? "md:max-w-[50%]" : "md:max-w-full"
      }`}
    >
      <h3
        className={`text-2xl font-bold mb-5 ${
          username?.length !== 0 ? "pl-6" : ""
        }`}
      >
        {`${
          username?.length > 0
            ? `Valoraciones para ${username}`
            : "Valoraciones de tu anfitrión"
        }`}
      </h3>

      <p className="text-center">Este usuario todavía no tiene valoraciones</p>
    </aside>
  );
}
