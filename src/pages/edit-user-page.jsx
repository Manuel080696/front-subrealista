import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header} from "../components/header";
import { Main } from "../components/main";
import { Footer } from "../components/footer";
import { Link } from "react-router-dom";
import { getUserDataService } from "../services/get_user";
import { updateUser } from "../services/update_user";
import { UserEditForm } from "../forms/user-edit-form";
import { validateField, newUserSchema } from "../utils/joi-validation";

export function EditUserPage() {
  const navigate = useNavigate();
  const { userId } = useParams(); // Asume que estás usando react-router-dom

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Carga inicial de los datos del usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserDataService(username);
        setFormData({ email: data.email, username: data.username, password: '' });
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  // Manejo de cambios en el formulario y validación
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    const error = validateField(name, value, userSchema);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Enviar los datos actualizados
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = userSchema.validate(formData, { abortEarly: false });
    if (error) {
      const errors = {};
      error.details.forEach(detail => {
        errors[detail.path[0]] = detail.message;
      });
      setValidationErrors(errors);
      return;
    }

    try {
      await updateUser(userName, formData);
      navigate("/profile"); 
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  if (isLoading) return <Main>Loading...</Main>;

  return (
    <>
        <Header />
        <Main>
            <h1 className="text-4xl block self-center">Edita tu cuenta</h1>
            <UserEditForm
                formData={formData}
              handleInputChange={handleInputChange}
              validationErrors={validationErrors}
              handleSubmit={handleSubmit} />
          <p className="flex justify-center gap-2">
              ¿Necesitas volver?
              <Link to="/profile" style={{ color: "var(--quaternary-color)" }}>
                  Volver al perfil
              </Link>
          </p>
      </Main></>
  );
}
