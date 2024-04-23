import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getTenantsRatings(username) {
  return sendApiRequest(METHODS.GET, `/users/${username}/ratings/rentings`);
}
