export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export async function sendApiRequest(method, endpoint, requestObject) {
  const headers = {};

  const body = requestObject ? JSON.stringify(requestObject) : undefined;
  if (requestObject) {
    headers["Content-Type"] = "application/json";
  }

  const token = localStorage.getItem(
    import.meta.env.VITE_APP_CURRENT_USER_STORAGE_ID
  );
  if (token) {
    headers["Authorization"] = token;
  }

  const response = await fetch(import.meta.env.VITE_APP_BACKEND + endpoint, {
    method,
    headers,
    body,
  });

  return await response.json();
}
