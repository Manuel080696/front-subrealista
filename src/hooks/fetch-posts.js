import { getAllPosts } from "../services/get-all-posts";
import { getProductsFiltered } from "../services/get-posts-filtered";

export async function fetchPosts(filteredPosts) {
  let postsData = [];
  if (filteredPosts.length !== 0) {
    const result = await getProductsFiltered(filteredPosts);
    console.log(result);
    if (result.status === "ok") {
      postsData = result.data;
    }
  } else {
    const result = await getAllPosts();
    if (result?.status === "ok") {
      postsData = result.data;
    }
  }

  return postsData;
}
