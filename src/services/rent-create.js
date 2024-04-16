export async function addRentService(formData) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/new-renting`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}
