import { useEffect } from "react";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { View, ActivityIndicator, Text } from "react-native";

export default function OAuthHandler() {
  const router = useRouter();
  const url = Linking.useURL();

  useEffect(() => {
    if (!url) return;

    const { queryParams } = Linking.parse(url);

    const access = queryParams?.access;
    const refresh = queryParams?.refresh;

    if (access && refresh) {
      SecureStore.setItemAsync("accessToken", access);
      SecureStore.setItemAsync("refreshToken", refresh);

      router.replace("/(tabs)");
    }
  }, [url]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 10 }}>로그인 처리 중...</Text>
    </View>
  );
}
