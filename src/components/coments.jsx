import { useEffect, useState } from "react";
import { getTenantsRatings } from "../services/get_tenants_ratings";
import CarouselComents from "./carouselComments";
import { useParams } from "react-router-dom";
import { getUserDataService } from "../services/get_user";

export function Coments({ post, user }) {
  const [ratings, setRatings] = useState([]);
  const [tenant, setTenant] = useState();
  const { username } = useParams();
  console.log(ratings);
  useEffect(() => {
    const fetchData = async () => {
      const ratingsData = await getTenantsRatings(
        post ? post.rent_owner : user.username
      );
      if (ratingsData !== undefined) {
        setRatings(ratingsData.data);
      }
    };
    fetchData();

    const fetchUserData = async () => {
      const allTenants = [];

      if (ratings) {
        for (const rating of ratings) {
          const tenantData = await getUserDataService(rating?.tenant_id);
          if (tenantData) {
            allTenants.push(tenantData);
          }
        }
      }
      setTenant(allTenants);
    };

    fetchUserData();
  }, []);

  return ratings !== undefined ? (
    <aside className="flex flex-col py-6 pb-8 gap-2 bg-[--tertiary-color] rounded-t-md w-full max-w-full">
      <h3
        className={`text-2xl font-bold mb-5 ${
          username?.length !== 0 ? "pl-6" : ""
        }`}
      >
        {`${
          username?.length > 0
            ? `Valoraciones de ${username}`
            : "Valoraciones de tu anfitrión"
        }`}
      </h3>

      <CarouselComents ratings={ratings} tenant={tenant} />
    </aside>
  ) : (
    <aside className="flex flex-col py-6 pb-8 gap-2 bg-[--tertiary-color] rounded-t-md w-full max-w-full">
      <h3
        className={`text-2xl font-bold mb-5 ${
          username?.length !== 0 ? "pl-6" : ""
        }`}
      >
        {`${
          username?.length > 0
            ? `Valoraciones de ${username}`
            : "Valoraciones de tu anfitrión"
        }`}
      </h3>

      <p className="text-center">Este usuario todavía no tiene valoraciones</p>
    </aside>
  );
}
