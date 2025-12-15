// src/api/apiClient.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function saveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getToken(key: string) {
  return await SecureStore.getItemAsync(key);
}

export async function removeToken(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(async (config) => {
  const token = await getToken("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    return Promise.reject(error);
  }
);
