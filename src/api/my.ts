import { apiClient } from "@/api/apiClient";

export async function fetchWrongArticles() {
  const res = await apiClient.get("/api/my/wrong");
  return res.data;
}

export async function fetchSolvedArticles() {
  const res = await apiClient.get("/api/my/solved");
  return res.data;
}
