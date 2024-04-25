import { useEffect, useState } from "react";
import { Main } from "../components/main";
import { Link, useNavigate } from "react-router-dom";
import { newUserSchema, validateField } from "../utils/joi-validation";
import { RegistrationForm } from "../forms/registration-form";
import { registerUser } from "../services/register_user";
import { Alert, Stack } from "@mui/material";

export function NewUserPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const validationError = validateField(name, value, newUserSchema);
    setValidationErrors({
      ...validationErrors,
      [name]: validationError,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = newUserSchema.validate(formData, {
      abortEarly: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setValidationErrors(errors);
      console.error("Error de validación:", errors.details);
      return;
    }

    const registrationSuccessful = await registerUser(
      formData.email,
      formData.username,
      formData.password,
      setError
    );
    if (registrationSuccessful) {
      navigate("/validate");
    }
  };

  return (
    <Main>
      <section className="flex flex-col h-screen w-full items-center justify-center">
        <h1 className="text-4xl block self-center mb-5">Crea tu cuenta</h1>
        <RegistrationForm
          formData={formData}
          handleInputChange={handleInputChange}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
        />
        {error ? (
          <Stack
            sx={{
              width: isMobileView ? "100%" : "50%",
              position: "static",
              zIndex: "20",
              bottom: "0",
              right: "0",
              backgroundColor: "white",
              marginTop: "1rem",
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
        ) : null}
        <p className="flex justify-center gap-2 mt-5">
          ¿Ya tienes una cuenta?
          <Link to="/login" style={{ color: "var(--quaternary-color)" }}>
            ¡Inicia sesión!
          </Link>
        </p>
      </section>
    </Main>
  );
}
