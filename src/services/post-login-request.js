import { toast } from "sonner";
import { METHODS, sendApiRequest } from "./send-api-request";

export async function loginUser(email, password) {
  const requestObject = { email, password };
  const response = await sendApiRequest(METHODS.POST, "/login", requestObject);
  if (response.status === "ok") {
    toast.success("Bienvenido a RetroTechShop");
    return response.token;
  } else {
    toast.error("Usuario o contraseña incorrectos");
    console.log("Error:", response.statusText);
    return null;
  }
}
