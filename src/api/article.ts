import { apiClient } from "@/api/apiClient";

export async function fetchArticleDetail(id: number) {
  const res = await apiClient.get(`/api/articles/${id}`);
  return res.data;
}

export async function fetchLatestArticles() {
  const res = await apiClient.get(`/articles/latest`);
  return res.data;
}
