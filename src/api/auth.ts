import { apiClient } from "@/api/apiClient";
import { saveAccessToken } from "@/lib/storage";

export async function saveToken(token: string) {
  await saveAccessToken(token);
}

export const fetchMyInfo = async () => {
  const res = await apiClient.get("/auth/me");
  return res.data;
};

export const logout = async () => {
  await apiClient.post("/auth/logout");
};
