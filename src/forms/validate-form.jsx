import { TextField, Button } from "@mui/material";

export const ValidateForm = ({ formData, handleInputChange, handleSubmit }) => (
  <section className="flex justify-center w-full md:w-9/12 xl:w-7/12">
    <span className="w-full md:w-9/12 xl:w-7/12 bg-white rounded-lg shadow-md p-5">
      <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4">
        <TextField
          label="Código"
          type="text"
          name="code"
          autoComplete="code"
          value={formData.code}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </span>
  </section>
);
