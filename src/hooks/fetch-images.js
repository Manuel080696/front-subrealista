import { getAllImages } from "../services/get-all-images";

export async function fetchImages(posts) {
  const postsArray = Array.isArray(posts) ? posts : [posts];
  // Obtener imágenes para cada publicación
  const promises = postsArray.map(async (rent) => {
    const imagesResult = await getAllImages(rent.rent_id);
    if (imagesResult?.status === "ok") {
      return {
        rentId: rent.rent_id,
        images: imagesResult?.data[1],
      };
    }
    return null;
  });

  // Esperar a que se resuelvan todas las promesas de obtención de imágenes
  const imagesData = await Promise.all(promises);

  // Filtrar y eliminar elementos nulos o duplicados
  const uniqueImagesData = imagesData.filter(
    (item, index, self) =>
      item && index === self.findIndex((t) => t?.rentId === item?.rentId)
  );

  return uniqueImagesData;
}
