import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getAllPosts() {
  return sendApiRequest(METHODS.GET, "/");
}
