export async function postRent(jsonData, token) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/new-renting/`,
    {
      method: "POST",
      body: jsonData,
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data[0];
}
