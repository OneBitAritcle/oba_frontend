// api/article.ts
import { apiClient } from "@/api/apiClient";

export async function fetchArticleDetail(id: string) {
  const res = await apiClient.get(`/api/articles/${id}`);
  return res.data;
}

export const fetchLatestArticles = async () => {
  const res = await apiClient.get("/articles/latest");
  return res.data;
};