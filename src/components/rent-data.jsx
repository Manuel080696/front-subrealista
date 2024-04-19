import { Services } from "../components/services";
import { Mapa } from "../components/map";
import { Fecha } from "../components/date-calendar";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function RentData({
  user,
  post,
  services,
  disableDate,
  dateValue,
  setDateValue,
}) {
  const hostSectionRef = useRef(null);
  const navigate = useNavigate();

  return (
    <section className="md:w-7/12">
      {/*Datos vivienda*/}
      <aside className="flex flex-col mx-6 py-6">
        <h1 className="text-2xl font-bold">{`${post.rent_title}, ${post.rent_location}`}</h1>
        <p className="font-medium mt-2">{`${post.rent_address}`}</p>
        <p>{`${post.rent_type} con ${post.rent_rooms} habitaciones`}</p>
      </aside>
      {/*Datos anfitrión*/}
      <aside className="flex flex-row mx-8 py-6 items-center gap-2 border-t">
        <img
          src={user?.profilePic}
          alt={`${user?.username}`}
          className="rounded-full w-12 aspect-square object-cover"
          onClick={() =>
            hostSectionRef.current.scrollIntoView({ behavior: "smooth" })
          }
        />
        <p className="font-medium">{`Anfitrión: ${user?.username}`}</p>
      </aside>

      {/*Descripción*/}
      <aside className="flex flex-row mx-8 py-6 items-center gap-2 border-t">
        <p className="font-medium">{post.rent_description}</p>
      </aside>

      {/*Servicios*/}
      <aside className="flex flex-col mx-8 py-6 gap-2 border-t">
        <h3 className="text-2xl font-bold mb-5">
          ¿Qué hay en este alojamiento?
        </h3>
        {services && <Services services={services[0]} />}
      </aside>

      {/*Localización*/}
      <aside className="flex flex-col mx-8 py-6 gap-2 border-t">
        <h3 className="text-2xl font-bold mb-5">¿Dónde me voy a quedar?</h3>
        <Mapa location={post.rent_address} />
      </aside>

      {/*Calendario*/}
      <aside className="flex flex-col mx-8 py-6 gap-2 border-t mb-5">
        <h3 className="text-2xl font-bold mb-5">
          ¿Cuándo está ocupada la vivienda?
        </h3>
        <Fecha
          active={true}
          dateDisable={disableDate}
          dateValue={dateValue}
          setDateValue={setDateValue}
        />
      </aside>

      {/*Anfitrión*/}
      <aside
        ref={hostSectionRef}
        className="flex flex-col p-6 pb-8 gap-2 bg-[--tertiary-color] rounded-md"
      >
        <h3 className="text-2xl font-bold mb-5">Conoce a tu anfitrión</h3>
        <section className="flex flex-col items-center w-full">
          <span className="flex flex-col items-center bg-white w-6/12 p-6 rounded-lg shadow-xl">
            <img
              src={user?.profilePic}
              alt={`${user?.username}`}
              onClick={() => navigate(`/users/${user?.username}`)}
              className="rounded-full w-24 aspect-square object-cover"
            />
            <p className="text-2xl font-semibold text-center mt-2">
              {user?.username}
            </p>

            <span className="flex flex-row items-center justify-center gap-2 py-5 border-b">
              <LanguageOutlinedIcon />
              <p className="text-md font-semibold text-center">
                {user?.address}
              </p>
            </span>

            <p className="text-md mt-5">{user?.bio}</p>
          </span>
        </section>
      </aside>
    </section>
  );
}
