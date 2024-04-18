import { useEffect, useState } from "react";
import { getRentData } from "../services/get-rent-data";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDataService } from "../services/get_user";
import dayjs from "dayjs";
import { PcGallery } from "../components/pc-gallery";
import { MobileGallery } from "../components/mobile-gallery";
import { RentData } from "../components/rent-data";
import { RentPrice } from "../components/rent-price";
import { PaymentGateway } from "../components/payment-gateway";
import { Alert, Stack } from "@mui/material";

export function PostPage({ setSuccess, success }) {
  const [post, setPost] = useState();
  const [images, setImages] = useState();
  const [services, setServices] = useState();
  const [rooms, setRooms] = useState(1);
  const [dateValue, setDateValue] = useState([]);
  const [disableDate, setDisableDate] = useState([]);
  const [daysDiff, setDaysDiff] = useState(1);
  const [user, setUser] = useState();
  const [payActive, setPayActive] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

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
        const dateRange = postData.data[3].map((date) => {
          const dateStart = formatDate(date.rental_start);
          const dateEnd = formatDate(date.rental_end);
          return { dateStart, dateEnd };
        });
        setDisableDate(dateRange);
        if (dateValue) {
          const daysDifference = dayjs(dateValue[1]).diff(dateValue[0], "day");
          setDaysDiff(daysDifference + 1);
        }
      }
    };
    fetchData();
  }, [id, dateValue]);

  /* console.log("Te falta seleccionar las fechas de ida y vuelta"); */
  /*  if (disableDate) console.log(dateValue); */

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
    post &&
    (payActive ? (
      <section className="flex flex-col items-center justify-center w-full">
        {dateValue.length !== 0 && (
          <PaymentGateway
            payActive={payActive}
            setPayActive={setPayActive}
            post={post}
            dateValue={dateValue}
            rooms={rooms}
            daysDiff={daysDiff}
            images={images}
            setSuccess={setSuccess}
            success={success}
            error={error}
            setError={setError}
          />
        )}
      </section>
    ) : (
      <section className="flex flex-col items-center justify-center w-full">
        <PcGallery
          images={images}
          active={active}
          setActive={setActive}
          post={post}
        />
        <section className="flex flex-col md:flex-row md:max-w-[1280px] pb-6">
          <MobileGallery images={images} post={post} navigate={navigate} />
          <RentData
            user={user}
            post={post}
            services={services}
            disableDate={disableDate}
            dateValue={dateValue}
            setDateValue={setDateValue}
          />
          <RentPrice
            formatDate={formatDate}
            dateValue={dateValue}
            post={post}
            rooms={rooms}
            setRooms={setRooms}
            daysDiff={daysDiff}
            images={images}
            payActive={payActive}
            error={error}
            setError={setError}
            setPayActive={setPayActive}
          />
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
    ))
  );
}
