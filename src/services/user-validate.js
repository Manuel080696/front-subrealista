import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function userValidate(code, setError) {
  const response = await sendApiRequest(METHODS.POST, `/validate/${code}`);
  if (response.status === "ok") {
    console.log(response.status);
    return response.status;
  } else {
    setError(`Error: ${response.message}`);
    return null;
  }
}
