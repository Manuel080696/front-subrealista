import { toast } from "sonner";

export const registerUser = async (email, username, password) => {
  const requestBody = { email, username, password };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      toast.success("Te has registrado con éxito");
      return true;
    } else {
      toast.error("El registro de usuario ha fallado");
      console.error(response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Ha ocurrido un error:", error);
    return null;
  }
};
