export const getAllImages = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/rentings/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
