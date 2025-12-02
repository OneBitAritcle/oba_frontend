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

// 응답 인터셉터 → 401이면 refresh 시도
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // 이미 refresh 시도했으면 재시도 금지
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        // refresh 요청
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccess = refreshResponse.data.accessToken;

        // 저장
        await SecureStore.setItemAsync("access_token", newAccess);

        // 기존 요청에 다시 주입
        original.headers.Authorization = `Bearer ${newAccess}`;

        return apiClient(original);
      } catch (e) {
        console.log("❌ Refresh 실패 → 로그인 필요");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
