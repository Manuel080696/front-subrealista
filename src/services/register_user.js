import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function registerUser(email, username, password, setError) {
  const requestBody = { email, username, password };
  const response = await sendApiRequest(METHODS.POST, `/register`, requestBody);
  if (response.status === "ok") {
    return response.status;
  } else {
    setError(`Error: ${response.message}`);
    return null;
  }
}
