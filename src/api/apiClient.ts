// app/api/apiClient.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// 토큰 저장
export async function saveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getToken(key: string) {
  return await SecureStore.getItemAsync(key);
}

export async function removeToken(key: string) {
  await SecureStore.deleteItemAsync(key);
}

// axios 인스턴스
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 : access token 자동 삽입
apiClient.interceptors.request.use(async (config) => {
  const token = await getToken("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 → refresh token 재발급
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refresh = await getToken("refreshToken");
        if (!refresh) throw new Error("No refresh token");

        const res = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken: refresh,
        });

        const newAccess = res.data.accessToken;
        await saveToken("accessToken", newAccess);

        original.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(original);
      } catch (err) {
        await removeToken("accessToken");
        await removeToken("refreshToken");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
