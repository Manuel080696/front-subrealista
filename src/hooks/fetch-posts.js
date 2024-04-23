import { getAllPosts } from "../services/get-all-posts";
import { getProductsFiltered } from "../services/get-posts-filtered";

export async function fetchPosts(filteredPosts) {
  let postsData = [];

  if (filteredPosts?.length > 0) {
    const result = await getProductsFiltered(filteredPosts);
    if (result.status === "ok") {
      postsData = result.data;
    }
  }

  if (filteredPosts?.length === 0) {
    const result = await getAllPosts();
    if (result?.status === "ok") {
      postsData = result.data;
    }
  }

  // Eliminar duplicados
  const uniquePostsData = removeDuplicates(postsData, "rent_id");

  return uniquePostsData;
}

function removeDuplicates(array, key) {
  return array.filter(
    (item, index, self) => index === self.findIndex((t) => t[key] === item[key])
  );
}
