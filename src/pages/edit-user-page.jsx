import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Main } from "../components/main";
import { Link } from "react-router-dom";
import { UserEditForm } from "../forms/user-edit-form";
import { validateField, modifyUserSchema } from "../utils/joi-validation";
import { updateUser } from "../services/update_user";
import { useLogout } from "../hooks/use-logout";
import { Alert, Stack } from "@mui/material";
import { getUserDataService } from "../services/get_user";

export function EditUserPage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [validationErrors, setValidationErrors] = useState("");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(""); // Asume que estás usando react-router-dom
  const logout = useLogout();

  const [formData, setFormData] = useState({
    email: "",
    address: "",
    bio: "",
  });

  // Carga inicial de los datos del usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const data = await getUserDataService(username);
          if (data?.length !== 0) {
            setUserData(data);
            setFormData({
              email: data?.email,
              address: data?.address,
              bio: data?.bio,
            });
          }
        }
        setIsLoading(false);
      } catch (error) {
        setError("Error al cargar los datos del usuario");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [username]);

  // Manejo de cambios en el formulario y validación
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    const error = validateField(name, value, modifyUserSchema);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Enviar los datos actualizados
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userData?.length !== 0) {
        await updateUser(userData?.username, formData);
      }
    } catch (error) {
      setError("Error al actualizar el usuario");
    } finally {
      logout();
      navigate("/");
    }
  };

  if (isLoading) return <Main>Loading...</Main>;

  return (
    <Main>
      <section className="flex flex-col justify-center items-center h-screen w-full">
        <h1 className="text-4xl block self-center">Edita tu cuenta</h1>
        <UserEditForm
          formData={formData}
          handleInputChange={handleInputChange}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
        />
        {error?.length !== 0 && (
          <Stack
            sx={{
              width: "60%",
              position: "static",
              zIndex: "20",
              backgroundColor: "white",
              paddingTop: "1rem",
            }}
            spacing={2}
          >
            <Alert
              variant="outlined"
              severity="warning"
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          </Stack>
        )}
        <p className="flex justify-center gap-2 mt-4">
          ¿Necesitas volver?
          <Link to="/profile" style={{ color: "var(--quaternary-color)" }}>
            Volver al perfil
          </Link>
        </p>
      </section>
    </Main>
  );
}
