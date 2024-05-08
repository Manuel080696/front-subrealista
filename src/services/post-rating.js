import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function postRating(id, jsonData) {
  return sendApiRequest(METHODS.POST, `/myrentals/${id}/rate`, jsonData);
}
