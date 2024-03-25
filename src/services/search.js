export const searchRentServices = async (searchTerm) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/rents?search=${searchTerm}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};
