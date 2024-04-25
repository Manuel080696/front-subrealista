import { METHODS, sendApiRequest } from "./send-api-request";

export async function loginUser(email, password, setError) {
  const requestObject = { email, password };
  const response = await sendApiRequest(METHODS.POST, "/login", requestObject);
  if (response.status === "ok") {
    return response.token;
  } else {
    setError(`Error: ${response.message}`);
    return null;
  }
}
