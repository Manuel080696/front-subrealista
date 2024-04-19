import { useState } from "react";
import { Main } from "../components/main";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/use-login";
import { Link } from "react-router-dom";
import { loginUserSchema, validateField } from "../utils/joi-validation";
import { LoginForm } from "../forms/login-form";
import { loginUser } from "../services/post-login-request";

export function LoginUserPage() {
  const setCurrentUserToken = useLogin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const validationError = validateField(name, value, loginUserSchema);
    setValidationErrors({
      ...validationErrors,
      [name]: validationError,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = loginUserSchema.validate(formData, { abortEarly: false });

    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setValidationErrors(errors);
      return;
    }

    const token = await loginUser(formData.email, formData.password);
    if (token) {
      setCurrentUserToken(token);
      navigate("/");
    } else {
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <Main>
      <section className="flex flex-col h-screen w-full items-center justify-center">
        <h1 className="text-4xl block self-center mb-5">Inicia sesión</h1>
        <LoginForm
          formData={formData}
          handleInputChange={handleInputChange}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
        />
        <p className="flex justify-center gap-2 mt-5">
          ¿No tienes cuenta?
          <Link to="/register" style={{ color: "var(--quaternary-color)" }}>
            ¡Regístrate!
          </Link>
        </p>
      </section>
    </Main>
  );
}
