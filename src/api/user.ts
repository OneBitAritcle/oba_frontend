import { apiClient } from "@/api/apiClient";

export async function fetchUserProfile() {
  const res = await apiClient.get("/api/user/me");
  return res.data;
}
