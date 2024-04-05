import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getUserRents(username) {
  return sendApiRequest(METHODS.GET, "/users/" + username + "/rentings");
}
