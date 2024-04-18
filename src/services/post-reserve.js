import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function postReserve(id, formData) {
  const response = await sendApiRequest(
    METHODS.POST,
    `/rentings/${id}`,
    formData
  );
  const data = await response.data;
  console.log(data);
  return data;
}
