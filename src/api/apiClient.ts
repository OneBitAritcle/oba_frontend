import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "@/constants/config";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Access Token 자동 주입
apiClient.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccess = refreshResponse.data.accessToken;

        await SecureStore.setItemAsync("access_token", newAccess);
        original.headers.Authorization = `Bearer ${newAccess}`;

        return apiClient(original);
      } catch (e) {
        console.log("Refresh Token 만료, 재로그인 필요");
      }
    }

    return Promise.reject(error);
  }
);
