import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function updateUser(userName, userData) {
	return sendApiRequest(METHODS.PUT, `/users/${userName}`, userData);
}
