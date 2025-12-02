import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const isWeb = Platform.OS === "web";

// Web 전용 로컬 스토리지 wrapper
const webStorage = {
  async getItem(key: string) {
    return Promise.resolve(localStorage.getItem(key));
  },
  async setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  async deleteItem(key: string) {
    localStorage.removeItem(key);
    return Promise.resolve();
  }
};

// 앱(SecureStore) + 웹(localStorage) 자동 분기
export async function getAccessToken() {
  if (isWeb) return webStorage.getItem("access_token");
  return SecureStore.getItemAsync("access_token");
}

export async function saveAccessToken(token: string) {
  if (isWeb) return webStorage.setItem("access_token", token);
  return SecureStore.setItemAsync("access_token", token);
}

export async function deleteAccessToken() {
  if (isWeb) return webStorage.deleteItem("access_token");
  return SecureStore.deleteItemAsync("access_token");
}
