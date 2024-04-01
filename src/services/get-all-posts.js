/* import { METHODS, sendApiRequest } from "./send-api-request.js";

export async function getAllPosts() {
  return sendApiRequest(METHODS.GET, "/");
} */

/* export const getAllPosts = async () => {
  const response = await fetch("/rentings.json");
  console.log(response);

  if (!response.ok) {
    throw new Error("Error al cargar los datos");
  }

  const json = await response.json();

  console.log(json);

  return json.data;
}; */

export const getAllPosts = async () => {
  try {
    const response = await fetch("/bdjson/rentings.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
