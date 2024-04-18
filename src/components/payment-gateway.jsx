import dayjs from "dayjs";
import { CostsPc } from "./costs-pc";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import { postReserve } from "../services/post-reserve";
import { Alert, Stack } from "@mui/material";

export function PaymentGateway({
  payActive,
  setPayActive,
  post,
  dateValue,
  rooms,
  daysDiff,
  images,
  success,
  setSuccess,
  error,
  setError,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  function formatDate(date) {
    return dayjs(date).format("MMM-DD");
  }

  function formatDateBack(date) {
    return dayjs(date).format("YYYY-MM-DD");
  }

  async function handlePayData(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("rental_start", formatDateBack(dateValue[0]));
      formData.append("rental_end", formatDateBack(dateValue[1]));

      if (formData.length > 1) {
        console.log(formData);
        await postReserve(id, formData);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSuccess(success);
      navigate("/");
    }
  }

  return rooms &&
    post &&
    dateValue.length !== 0 &&
    payActive &&
    images.length !== 0 ? (
    <section className="flex flex-col relative w-full h-screen max-w-[75rem] py-8">
      <button
        className="flex flex-col items-center justify-center absolute top-10 left-0 border rounded-full p-2 shadow-sm"
        onClick={() => setPayActive(!payActive)}
      >
        <ArrowBackIosNewIcon />
      </button>
      <section className="flex flex-col items-center justify-center bg-white relative max-w-[75rem] h-full mt-20">
        <section className="flex flex-row gap-24">
          {daysDiff && (
            <aside className="flex flex-col w-6/12">
              <h2 className="font-semibold text-2xl pl-6">Tu viaje</h2>
              <CostsPc post={post} daysDiff={daysDiff} />
            </aside>
          )}
          <aside className="flex flex-row gap-4 w-6/12 border rounded-xl p-8 shadow-md">
            <img
              src={images[0].rent_image}
              alt="rentImage"
              className="w-6/12 h-fit aspect-square rounded-md object-object-cover"
            />
            <span className="w-full">
              <h3 className="font-semibold text-lg">{post.rent_title}</h3>
              <span className="flex flex-col px-2 text-sm mt-2">
                <p>Vivienda: {post.rent_type}</p>
                <p>Localización: {post.rent_location}</p>
                <p>Habitaciones: {post.rent_rooms}</p>
                <p className="border w-full mt-4" />
                <p className="mt-4">Anfitrion: {post.rent_owner}</p>
                <p className="mt-2">{`Ida: ${formatDate(dateValue[0])}`}</p>
                <p>{`Vuelta: ${formatDate(dateValue[1])}`}</p>
              </span>
            </span>
          </aside>
        </section>
        <button
          className="p-6 w-[10rem] self-end text-white font-semibold rounded-xl bg-gradient-to-b from-quaternary-inicio to-quaternary-fin mt-16"
          onClick={(e) => handlePayData(e)}
        >
          Reservar
        </button>
      </section>
      {error ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert
            variant="outlined"
            severity="warning"
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        </Stack>
      ) : null}
    </section>
  ) : null;
}
