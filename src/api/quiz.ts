import { apiClient } from "@/api/apiClient";

export async function submitQuiz(articleId: string, payload: any) {
  const res = await apiClient.post(`/api/quiz/${articleId}`, payload);
  return res.data;
}

export const fetchQuiz = async (articleId: number) => {
  const res = await apiClient.get(`/quiz/${articleId}`);
  return res.data;
};

export const submitSolved = async (articleId: number) => {
  const res = await apiClient.post("/quiz/solved", { articleId });
  return res.data;
};

export const submitIncorrect = async (
  articleId: number,
  incorrectList: boolean[]
) => {
  const res = await apiClient.post("/quiz/incorrect", {
    articleId,
    incorrectList,
  });
  return res.data;
};
