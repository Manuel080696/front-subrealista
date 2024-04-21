import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function postReserve(id, jsonData) {
  const response = await sendApiRequest(
    METHODS.POST,
    `/rentings/${id}`,
    jsonData
  );
  const data = await response.data;
  return data;
}
