import { TextField, Button } from "@mui/material";
import { useState } from "react";

export const RegistrationForm = ({
  formData,
  validationErrors,
  handleInputChange,
  handleSubmit,
  setSecondPassword,
}) => {
  const [overed, setOvered] = useState(false);

  return (
    <section className="flex justify-center w-full md:w-9/12 xl:w-7/12">
      <span className="w-full md:w-9/12 xl:w-7/12 bg-white rounded-lg shadow-md p-5">
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4">
          <TextField
            label="Correo electrónico"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
          <TextField
            label="Nombre de usuario"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            error={!!validationErrors.username}
            helperText={validationErrors.username}
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleInputChange}
            required
            error={!!validationErrors.password}
            helperText={validationErrors.password}
          />
          <TextField
            label="Repite la contraseña"
            type="password"
            name="repeatPassword"
            autoComplete="new-password"
            onChange={(e) => setSecondPassword(e.target.value)}
            required
            error={!!validationErrors.password}
            helperText={validationErrors.password}
          />
          <Button
            type="submit"
            sx={{
              backgroundColor: "black",
              color: `${overed ? "black" : "white"}`,
            }}
            onMouseOver={() => setOvered(true)}
            onMouseLeave={() => setOvered(false)}
          >
            Registrarse
          </Button>
        </form>
      </span>
    </section>
  );
};
