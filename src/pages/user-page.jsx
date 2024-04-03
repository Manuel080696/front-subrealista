import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { Rating } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
/* import { modifyUserPic } from "../api/put-modify-user-profile-pic"; */
import { Main } from "../components/main";
import { useCurrentUser } from "../hooks/use-current-user";
import { toast } from "sonner";
import { getUserRents } from "../services/get-all-rents-by-username";
import EditIcon from "@mui/icons-material/Edit";
import { CurrentUserContext } from "../context/auth-context";
import Carousel from "../components/carousel";
import { getRentData } from "../services/get-rent-data";
import { getAllImages } from "../services/get-all-images";
export function UserPage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [error, setError] = useState(null);
  const [rents, setRents] = useState([]);
  const [images, setImages] = useState([]);
  const { userData } = useContext(CurrentUserContext);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);
  const [accountOwnership, setAccountOwnership] = useState(false);
  const currentUser = useCurrentUser();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const shortDate = dayjs(userData?.createdAt).format("DD/MM/YYYY");

  /*  console.log(userData); */
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchUserRents = useCallback(async () => {
    if (userData) {
      const result = await getUserRents(userData.username);
      if (result?.status === "ok") {
        setRents(result?.data);

        // Obtener todas las imágenes para cada publicación de forma concurrente
        const promises = result.data.map(async (rent) => {
          const imagesResult = await getAllImages(rent?.rent_id);
          if (imagesResult?.status === "ok") {
            return {
              rentId: rent?.rent_id,
              images: imagesResult?.data[1],
            };
          }
          return null;
        });

        // Esperar a que todas las promesas se resuelvan
        const imagesData = await Promise.all(promises);

        // Filtrar y eliminar elementos nulos o duplicados
        const uniqueImagesData = imagesData.filter(
          (item, index, self) =>
            item && index === self.findIndex((t) => t?.rentId === item?.rentId)
        );

        // Establecer el estado de imágenes con los datos únicos
        setImages(uniqueImagesData);
      }
    }
  }, [username]);

  const checkOwnership = useCallback(() => {
    if (username === currentUser?.user?.username) {
      setAccountOwnership(true);
    }
  }, [username, currentUser]);

  useEffect(() => {
    fetchUserRents();
    checkOwnership();
  }, [checkOwnership, currentUser]);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCameraIconClick = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };

  /*   const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const userId = userData.id;
    if (file && userId) {
      try {
        const result = await modifyUserPic(userId, file);
        if (result.status === "ok") {
          fetchUserData(username);
          toast.success("Imagen de perfil cargada con éxito. 🎉");
        } else {
          toast.error("No se ha podido cargar la imagen. 😭");
          console.error("Error updating the image.");
          setError("Error updating the image.");
        }
      } catch (error) {
        console.error("Connection error:", error);
        setError("Connection error.");
      }
    }
  }; */

  return (
    <Main>
      <article className="flex w-full max-w-screen-2xl">
        <section className="flex flex-col w-full md:flex-row">
          <span
            className="flex flex-col md:w-2/5 md:min-w-72 bg-white rounded-lg shadow-md p-5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!isHovered ||
              (accountOwnership && (
                <IconButton
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(255, 255, 255, 0.7)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleCameraIconClick}
                >
                  <PhotoCameraIcon />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                </IconButton>
              ))}

            <img
              className="w-32 h-32 rounded-full mx-auto object-cover"
              src={userData?.profilePic}
              alt={"Foto de " + userData?.username}
            />

            <h2 className="text-center text-2xl font-semibold mt-3">
              {userData?.username}
            </h2>
            <h3 className="text-center text-gray-600 mt-1">
              {userData?.media_valoracion ? (
                <span className="flex align-middle justify-center">
                  <Rating value={userData?.media_valoracion} readOnly /> (
                  {userData?.media_valoracion})
                </span>
              ) : (
                "Sin valoraciones"
              )}
            </h3>

            <span className="flex justify-center mt-5">
              <p>Usuario desde: {shortDate}</p>
            </span>
          </span>

          <section className="flex flex-col px-10 w-full">
            <h2 className="text-3xl font-bold">{`Información de ${userData?.username}`}</h2>
            {accountOwnership ? (
              <button
                onClick={() => navigate("/users/update")}
                className="flex flex-col items-center text-xs mt-5 font-semibold justify-center w-full border border-black p-2 rounded-lg min-w-28 max-w-28 md:w-2/5 "
              >
                {isMobileView ? <EditIcon /> : "Editar tu perfil"}
              </button>
            ) : (
              ""
            )}
            <span className="mt-5">
              <p className="mt-2">{userData?.bio}</p>
            </span>
          </section>
        </section>
      </article>

      {accountOwnership ? (
        <section className="flex gap-4 justify-around"></section>
      ) : (
        ""
      )}

      <section className="mb-3 mt-3">
        <h2 className="text-2xl text-center mb-3">Mis Posts</h2>
        <ul className="flex flex-row flex-wrap basis-20 w-full justify-around gap-3 max-w-screen-2xl md:flex-nowrap">
          {rents?.map((image) => {
            const rentImages = images.find(
              (item) => item.rentId === image.rent_id
            );
            return (
              <li key={image.rent_id} className="w-full">
                <Carousel
                  images={rentImages?.length !== 0 ? rentImages : null}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </Main>
  );
}
