import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const isWeb = Platform.OS === "web";

const webStorage = {
  async getItem(key: string) {
    return localStorage.getItem(key);
  },
  async setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  },
  async deleteItem(key: string) {
    localStorage.removeItem(key);
  },
};

export async function getAccessToken() {
  return isWeb
    ? webStorage.getItem("access_token")
    : SecureStore.getItemAsync("access_token");
}

export async function saveAccessToken(token: string) {
  return isWeb
    ? webStorage.setItem("access_token", token)
    : SecureStore.setItemAsync("access_token", token);
}

export async function deleteAccessToken() {
  return isWeb
    ? webStorage.deleteItem("access_token")
    : SecureStore.deleteItemAsync("access_token");
}
