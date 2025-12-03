import { API_BASE_URL } from "@/constants/config";

export const BASE_URL = API_BASE_URL;

export async function apiGet(url: string, token: string) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("API Error");

  return res.json();
}
