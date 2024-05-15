import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getUserDataService } from "../services/get-user";
import { useNavigate } from "react-router-dom";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import "./user-reservations.css";
import { manageRentals } from "../services/mange-rentals-status";
import { getUsersRentals } from "../services/get-other-users-rentals";

export const UsersReservations = () => {
  const [user, setUser] = useState([]);
  const [username, setUserName] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [changuedStatus, setChanguedStatus] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [pendingReservations, setPendingReservations] = useState();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function formatDate(date) {
    return dayjs(date).format("MMM-DD");
  }

  const handleManageStatus = (id, status) => {
    const fetchStatus = async () => {
      await manageRentals(id, status);
    };
    setChanguedStatus(true);
    fetchStatus();
  };

  useEffect(() => {
    const fetchUsersReservationsData = async () => {
      const data = await getUsersRentals();
      console.log(data);
      if (data) {
        setReservations(data.data);
        const pending = data.data.filter(
          (reservation) => reservation.rental_status === "Pendiente"
        );
        setPendingReservations({
          ...pendingReservations,
          pendingRentsNumber: pending.length,
          pendingRentsArray: pending,
        });
      }
    };
    fetchUsersReservationsData();
    setChanguedStatus(false);
  }, [reservations?.length, changuedStatus]);

  useEffect(() => {
    const fetchUsernames = () => {
      if (reservations.length > 0) {
        const names = reservations.map(
          (reservation) => reservation.rental_tenant
        );

        setUserName(names);
      }
    };

    fetchUsernames();
  }, [reservations]);

  useEffect(() => {
    if (username.length !== 0) {
      const fetchUserData = async () => {
        const userDataArray = await Promise.all(
          username?.map(async (name) => {
            const data = await getUserDataService(name);
            return data;
          })
        );
        setUser(userDataArray);
      };

      fetchUserData();
    }
  }, [username]);

  return user && reservations?.length !== 0 ? (
    <section className="flex flex-col w-full items-center my-8 justify-center md:min-h-[80vh] md:my-0">
      <h2 className="text-center font-bold text-xl mt-8 md:text-2xl">
        Reservas realizadas por los usuarios
      </h2>
      <ul
        className={`custom-scrollbar flex flex-col w-full items-center justify-center p-4 gap-4 overflow-y-scroll md:w-7/12 md:h-full md:min-w-[45rem] md:gap-8 md:mt-8 ${
          isHovered ? "overflow-y-scroll" : ""
        }`}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {reservations?.map((reservation, index) => {
          return (
            <li
              key={reservation.rental_id}
              className="flex flex-col w-full h-full items-center bg-orange-50 py-4 px-4 justify-between md:flex-row md:items-start"
            >
              <aside className="flex flex-col w-full md:w-fit md:h-full">
                <h3 className="text-lg font-bold mb-4 md:text-xl">{`${reservation.rent_title} - ${reservation.rent_location}`}</h3>

                <span className="flex flex-row">
                  <img
                    className="w-28 aspect-square object-cover md:w-32"
                    src={reservation.rent_cover}
                    alt={reservation.rent_title}
                  />
                  <span className="flex flex-col gap-2 mt-4 pl-6 md:gap-2 md:pl-6">
                    <p>{reservation.rent_description}</p>

                    <p className="font-semibold">
                      {`${formatDate(reservation.rental_start)} - ${formatDate(
                        reservation.rental_end
                      )}`}
                    </p>
                    <button
                      className="flex flex-row w-fit items-center bg-white p-4 rounded-full shadow-md gap-4"
                      onClick={() =>
                        navigate(`/users/${reservation?.rental_tenant}`)
                      }
                    >
                      <img
                        src={
                          user &&
                          user[index]?.profilePic !== (undefined || null) &&
                          user[index]?.profilePic?.length !== 0
                            ? user[index]?.profilePic
                            : "/users/default_avatar.png"
                        }
                        alt={`${user?.username}`}
                        className="rounded-full w-12 aspect-square object-cover"
                      />
                      <p className="font-medium">{`${reservation?.rental_tenant}`}</p>
                    </button>
                  </span>
                </span>
              </aside>

              <aside className="flex flex-col w-full relative mt-4 relative md:w-fit md:mt-0 md:h-full md:items-start md:justify-start">
                {isMobileView ? (
                  <aside
                    className={`flex flex-row w-full justify-between ${
                      reservation.rental_status === "Pendiente" ? "mb-10" : ""
                    }`}
                  >
                    <span className="flex flex-row gap-2 self-start">
                      <p>{reservation.rental_status}</p>
                      {reservation.rental_status === "Pendiente" ? (
                        <NewReleasesOutlinedIcon color="warning" />
                      ) : (
                        <CheckCircleOutlinedIcon color="success" />
                      )}
                    </span>
                    <span
                      className={`flex flex-col text-xl items-end font-bold md:text-2xl ${
                        reservation.rental_status === "Pendiente"
                          ? "mb-10"
                          : "mb-2"
                      }`}
                    >
                      <p>{`${reservation.rent_price}€`}</p>
                    </span>
                  </aside>
                ) : (
                  <aside className="flex flex-col grow-1 h-full content-evenly">
                    <span
                      className={`flex flex-row gap-2 self-start  grow-1 ${
                        reservation.rental_status !== "Pendiente"
                          ? "mb-[130%]"
                          : "mb-[75%]"
                      }`}
                    >
                      <p>{reservation.rental_status}</p>
                      {reservation.rental_status === "Pendiente" ? (
                        <NewReleasesOutlinedIcon color="warning" />
                      ) : (
                        <CheckCircleOutlinedIcon color="success" />
                      )}
                    </span>
                    <span
                      className={`flex flex-col text-xl items-end font-bold md:text-2xl ${
                        reservation.rental_status !== "Pendiente"
                          ? "mb-0"
                          : "mb-8"
                      }`}
                    >
                      <p>{`${reservation.rent_price}€`}</p>
                    </span>
                  </aside>
                )}

                {reservation.rental_status === "Pendiente" && (
                  <span className="flex flex-row absolute w-full mt-8 bottom-0 right-0 gap-4 md:mt-0 md:w-fit md:-bottom-8">
                    <button
                      className="flex flex-col w-full text-red-500 font-semibold items-center bg-white p-4 rounded-md shadow-md gap-4 md:w-fit"
                      onClick={() =>
                        handleManageStatus(reservation.rental_id, {
                          rental_status: "Rechazado",
                        })
                      }
                    >
                      Rechazar
                    </button>
                    <button
                      className="flex flex-col w-full text-white font-semibold items-center bg-black p-4 rounded-md shadow-md gap-4 md:w-fit"
                      onClick={() =>
                        handleManageStatus(reservation.rental_id, {
                          rental_status: "Aceptado",
                        })
                      }
                    >
                      Aceptar
                    </button>
                  </span>
                )}
              </aside>
            </li>
          );
        })}
      </ul>
    </section>
  ) : (
    <section className="flex flex-col w-full items-center justify-center">
      <h2 className="text-center font-semibold text-2xl">
        Reservas realizadas por los usuarios
      </h2>
      <ul className="flex flex-col w-6/12 items-center justify-center p-4 overflow-y-scroll">
        <p>Aún no has recibido ningúna reserva.</p>
      </ul>
    </section>
  );
};
