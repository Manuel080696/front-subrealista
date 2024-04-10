export const getUserDataService = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/users/${id}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  console.log(json.data);
  return json.data;
};
