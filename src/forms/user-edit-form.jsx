import { TextField, Button } from "@mui/material";

export const UserEditForm = ({
  formData,
  validationErrors,
  handleInputChange,
  handleSubmit,
}) => (
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
        <Button type="submit" variant="contained" color="primary">
          Actualizar
        </Button>
      </form>
    </span>
  </section>
);

