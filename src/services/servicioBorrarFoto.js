import { API_HOST } from "../../utils/constants";
import { METHOD, sendApiRequest } from "./sendApiRequest";

export const deleteImages = async (foto_id, requestObject) => {
  return sendApiRequest(
    METHOD.DELETE,
    API_HOST + `ruta/${foto_id}`,
    requestObject
  );
};