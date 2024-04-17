import { useEffect, useRef, useState } from "react";
import { getRentData } from "../services/get-rent-data";
import Carousel from "../components/carousel";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getUserDataService } from "../services/get_user";
import { Services } from "../components/services";
import { Mapa } from "../components/map";
import { Fecha } from "../components/date-calendar";
import dayjs from "dayjs";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

export function PostPage() {
  const [post, setPost] = useState();
  const [images, setImages] = useState();
  const [services, setServices] = useState();
  const [rooms, setRooms] = useState(1);
  const [dateValue, setDateValue] = useState([]);
  const [disableDate, setDisableDate] = useState([]);
  const [daysDiff, setDaysDiff] = useState(1);
  const [user, setUser] = useState();
  const [active, setActive] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const hostSectionRef = useRef(null);

  function formatDate(date) {
    return dayjs(date).format("YYYY-MM-DD");
  }

  useEffect(() => {
    const fetchData = async () => {
      const postData = await getRentData(id);
      setPost(postData.data[0]);
      setImages(postData.data[1]);
      setServices(postData.data[2]);
      if (postData && postData.data[3]) {
        postData.data[3].map((date) => {
          const dateStart = formatDate(date.rental_start);
          const dateEnd = formatDate(date.rental_end);
          setDisableDate([dateStart, dateEnd]);
        });
        const daysDifference = dayjs(dateValue[1]).diff(dateValue[0], "day");
        setDaysDiff(daysDifference + 1);
      }
    };
    fetchData();
  }, [id, dateValue]);

  useEffect(() => {
    if (post) {
      const fetchUserData = async () => {
        const userData = await getUserDataService(post.rent_owner);
        setUser(userData);
      };
      fetchUserData();
    }
  }, [post]);

  return (
    post && (
      <section className="flex flex-col items-center justify-center w-full">
        {/*Galería de pc*/}
        <aside className="hidden md:flex md:flex-col md:mt-5 md:rounded-md relative">
          <ul className="flex flex-row items-center gap-2 md:max-w-[1280px] px-6">
            {/* Mostrar solo la primera imagen grande */}
            {images && images.length > 0 && (
              <li className="w-6/12 h-full">
                <img
                  src={images[0].rent_image}
                  alt="RentImage"
                  className="aspect-square object-cover rounded-l-xl"
                />
              </li>
            )}
            {/* Mostrar las siguientes imágenes en un cuadrado */}
            <li className="grid grid-cols-2 grid-rows-2 gap-2 w-6/12">
              {images &&
                images
                  .slice(1, 5)
                  .map((image, id) => (
                    <img
                      key={id + 1}
                      src={image.rent_image}
                      alt="RentImage"
                      className={`aspect-square object-cover ${
                        id === 1 ? "rounded-tr-xl" : ""
                      } ${id === 3 ? "rounded-br-xl" : ""}`}
                    />
                  ))}
            </li>
          </ul>
          {images.length > 5 ? (
            <button
              className="bg-white rounded-md p-2 absolute bottom-3 right-9 border border-black shadow-xl"
              onClick={() => setActive(!active)}
            >
              Más imágenes
            </button>
          ) : null}
          {active && (
            <section className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 flex justify-center items-center">
              <button
                className="absolute top-0 right-0 m-4 text-white"
                onClick={() => setActive(!active)}
              >
                <CloseIcon sx={{ height: "2rem", width: "2rem" }} />
              </button>
              <aside className="relative w-5/12">
                <Carousel images={images} rent={post[0]} />
              </aside>
            </section>
          )}
        </aside>
        <section className="flex flex-col md:flex-row md:max-w-[1280px]">
          {/*Galería de móvil*/}
          <aside className="flex flex-col md:hidden">
            <button
              onClick={() => navigate("/")}
              className="absolute flex flex-col justify-center top-2 left-2 z-20 p-2 bg-white border-0 rounded-full shadow"
            >
              <ArrowBackIosNewIcon sx={{ width: "1rem", height: "1rem" }} />
            </button>
            <Carousel images={images} rent={post[0]} />
          </aside>

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
              <h3 className="text-2xl font-bold mb-5">
                ¿Dónde me voy a quedar?
              </h3>
              <Mapa location={post.rent_address} />
            </aside>

            {/*Calendario*/}
            <aside className="flex flex-col mx-8 py-6 gap-2 border-t mb-5">
              <h3 className="text-2xl font-bold mb-5">
                ¿Cuándo está ocupada la vivienda?
              </h3>
              <Fecha
                active={true}
                setActive={setActive}
                dateDisable={disableDate}
                dateValue={dateValue}
                setDateValue={setDateValue}
              />
            </aside>

            {/*Anfitrión*/}
            <aside
              ref={hostSectionRef}
              className="flex flex-col p-6 gap-2 bg-[--tertiary-color]"
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
          {/*Precio*/}
          <aside className="w-5/12 hidden p-6 gap-2 md:flex">
            <section className="flex flex-col items-center w-full">
              <span className="flex flex-col w-full items-center bg-white p-6 rounded-lg shadow-xl border sticky top-56 right-0">
                <h3 className="text-2xl font-bold mb-5">{`${post.rent_price}€ noche`}</h3>
                <ul className="flex flex-row w-full items-center justify-center border-2 rounded-lg flex-wrap">
                  {dateValue && dateValue[0] > 1 ? (
                    <li className="px-4 py-2 w-6/12 border-r">
                      <p className="text-sm font-semibold">Ida</p>
                      <p className="text-sm">{formatDate(dateValue[0])}</p>
                    </li>
                  ) : (
                    <li className="px-4 py-2 w-6/12 border-r">
                      <p className="text-sm font-semibold">Ida</p>
                      <p className="text-sm">...</p>
                    </li>
                  )}
                  {dateValue && dateValue[1] > 1 ? (
                    <li className="px-4 py-2 w-6/12 border-l">
                      <p className="text-sm font-semibold">Vuelta</p>
                      <p className="text-sm">{formatDate(dateValue[1])}</p>
                    </li>
                  ) : (
                    <li className="px-4 py-2 w-6/12 border-l">
                      <p className="text-sm font-semibold">Vuelta</p>
                      <p className="text-sm">...</p>
                    </li>
                  )}
                  <li className="flex flex-row items-center w-full gap-2 border-t-2">
                    <label className="text-sm font-semibold p-4">
                      Viajeros
                      <input
                        className="w-full font-normal text-xs hover:bg-zinc-200 mt-[0.43rem] focus:outline-none"
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={rooms}
                        id="tenants"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        placeholder="Num.inquilinos..."
                        onChange={(e) => setRooms(e.target.value)}
                      />
                    </label>
                    <button
                      onClick={() => setRooms(rooms >= 15 ? 15 : rooms + 1)}
                      className="rounded-full p-1 h-fit bg-white border"
                    >
                      <AddIcon sx={{ height: "1rem" }} />
                    </button>
                    <button
                      onClick={() => setRooms(rooms <= 0 ? 0 : rooms - 1)}
                      className="rounded-full p-1 h-fit bg-white border"
                    >
                      <RemoveIcon sx={{ height: "1rem" }} />
                    </button>
                  </li>
                </ul>
                <button className="p-6 w-full text-white font-semibold rounded-xl bg-gradient-to-b from-quaternary-inicio to-quaternary-fin mt-5">
                  Reservar
                </button>
                <ul className="w-full p-6">
                  <li className="flex flex-row w-full justify-between py-1">
                    <p>{`${post.rent_price} x ${daysDiff} noches`}</p>
                    <p>{`${post.rent_price * daysDiff}€`}</p>
                  </li>
                  <li className="flex flex-row w-full justify-between py-1">
                    <p>Gastos de limpieza</p>
                    <p>{`${(post.rent_price * daysDiff * 24) / 100}€`}</p>
                  </li>
                  <li className="flex flex-row w-full justify-between py-1">
                    <p>Comisión de servicio Subrealista</p>
                    <p>{`${(post.rent_price * daysDiff * 28) / 100}€`}</p>
                  </li>
                  <li className="flex flex-row w-full justify-between py-1">
                    <p>Impuestos</p>
                    <p>{`${(post.rent_price * daysDiff * 21) / 100}€`}</p>
                  </li>
                  <li className="flex flex-row w-full justify-between border-t pt-6 mt-5">
                    <p className="font-semibold">Total</p>
                    <p className="font-semibold">{`${
                      post.rent_price * daysDiff +
                      (post.rent_price * daysDiff * 24) / 100 +
                      (post.rent_price * daysDiff * 28) / 100 +
                      (post.rent_price * daysDiff * 21) / 100
                    }€`}</p>
                  </li>
                </ul>
              </span>
            </section>
          </aside>
        </section>
      </section>
    )
  );
}
