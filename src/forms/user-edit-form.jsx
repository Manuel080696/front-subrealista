import { TextField, Button } from "@mui/material";
import { useState } from "react";

export const UserEditForm = ({
  formData,
  validationErrors,
  handleInputChange,
  handleSubmit,
}) => {
  const [overed, setOvered] = useState(false);

  return (
    <section className="flex justify-center w-full md:w-9/12 xl:w-7/12">
      <span className="w-full md:w-9/12 xl:w-7/12 bg-white rounded-lg shadow-md p-5">
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4">
          <TextField
            label="Nombre de usuario"
            type="text"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleInputChange}
            error={!!validationErrors.username}
            helperText={validationErrors.username}
          />
          <TextField
            label="Correo electrónico"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
          <TextField
            label="Dirección"
            name="address"
            autoComplete="address"
            value={formData.address}
            onChange={handleInputChange}
          />

          <TextField
            label="Descripción"
            name="bio"
            autoComplete="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-10/12 pl-3"
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
            Actualizar
          </Button>
        </form>
      </span>
    </section>
  );
};
