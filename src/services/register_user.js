import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function registerUser(email, username, password, repeatPassword) {
  const requestBody = { email, username, password, repeatPassword };
  return await sendApiRequest(METHODS.POST, `/register`, requestBody);
}
