// oba_frontend/src/api/apiClient.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

// 본인 PC의 IP 주소로 수정 필수
const BASE_URL = "http://192.168.219.101:9000"; 

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터: 토큰 자동 첨부
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 에러 시 로그아웃 처리
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync("accessToken");
      router.replace("/(auth)/login");
    }
    return Promise.reject(error);
  }
);