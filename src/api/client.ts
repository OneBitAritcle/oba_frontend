// api/client.ts
export const BASE_URL = "http://43.200.179.159:9000";

export async function apiGet(url: string, token: string) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${url}`);
  }

  return res.json();
}
