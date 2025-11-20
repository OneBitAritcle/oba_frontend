import { useEffect } from "react";
import { Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function OAuthRedirect() {
  const { token } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      SecureStore.setItemAsync("jwt", String(token));
      router.replace("/(tabs)/index"); // 홈 화면 이동
    }
  }, [token]);

  return <Text style={{ marginTop: 50 }}>로그인 처리중...</Text>;
}
