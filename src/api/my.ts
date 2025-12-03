import { apiClient } from "@/api/apiClient";

export const fetchWrongArticles = async () => {
  const res = await apiClient.get("/api/my/wrong");
  return res.data;
};

export const fetchSolvedArticles = async () => {
  const res = await apiClient.get("/api/my/solved");
  return res.data;
};
