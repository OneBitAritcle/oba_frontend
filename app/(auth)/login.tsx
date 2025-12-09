import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { apiClient } from "../../src/api/apiClient";
import * as SecureStore from "expo-secure-store";
import * as Device from "expo-device";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get("window");
const BACKEND_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 🔥🔥 수정된 OAuth 호출 함수 — 반드시 이 버전으로 사용해야 네이버 로그인 가능
  const startOAuth = async (provider: string) => {
    if (!BACKEND_URL) {
      Alert.alert("환경 오류", "EXPO_PUBLIC_API_URL 이 없습니다.");
      return;
    }

    // 기존 OAuth2 엔드포인트 ❌
    // const authUrl = `${BACKEND_URL}/oauth2/authorization/${provider}`;

    // 🔥 정답: 브리지 엔드포인트 사용
    const authUrl = `${BACKEND_URL}/oauth/bridge/${provider}`;

    await WebBrowser.openBrowserAsync(authUrl);
  };

  const handleMobileLogin = async () => {
    try {
      setLoading(true);

      const idToken =
        Device.osInternalBuildId ||
        Device.modelName ||
        "unknown-device-" + Math.random();

      const res = await apiClient.post("/auth/mobile/login", { idToken });
      const { accessToken, refreshToken } = res.data;

      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);

      Alert.alert("로그인 성공");
      router.replace("/(tabs)");
    } catch (err) {
      Alert.alert("로그인 실패", "다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/knight/hand.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>한입기사</Text>
          <Text style={styles.subtitle}>One Bite Article</Text>

          <View style={styles.btnWrap}>
            <TouchableOpacity
              style={[styles.btn, styles.google]}
              onPress={() => startOAuth("google")}
            >
              <Image
                source={require("../../assets/icons/google.png")}
                style={styles.icon}
              />
              <Text style={styles.btnText}>구글로 로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.kakao]}
              onPress={() => startOAuth("kakao")}
            >
              <Image
                source={require("../../assets/icons/kakao-talk.png")}
                style={styles.icon}
              />
              <Text style={[styles.btnText, { color: "#3B1E1E" }]}>
                카카오로 로그인
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.naver]}
              onPress={() => startOAuth("naver")}
            >
              <Image
                source={require("../../assets/icons/naver.png")}
                style={styles.icon}
              />
              <Text style={styles.btnText}>네이버로 로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.mobile]}
              onPress={handleMobileLogin}
              disabled={loading}
            >
              <Text style={[styles.btnText, { color: "#fff" }]}>
                {loading ? "로그인 중..." : "한입 계정으로 로그인"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 30 },
  logo: { width: width * 0.55, height: height * 0.23, marginBottom: 16 },
  title: { fontSize: 32, fontWeight: "800", color: "#333" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 4, marginBottom: 42 },
  btnWrap: { width: "85%", gap: 14, alignItems: "center" },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
    justifyContent: "center",
    width: "100%",
  },
  icon: { width: 20, height: 20 },
  google: { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#DDD" },
  kakao: { backgroundColor: "#FEE500" },
  naver: { backgroundColor: "#03C75A" },
  mobile: { backgroundColor: "#4B4DFF", marginTop: 10 },
  btnText: { fontSize: 16, fontWeight: "600", color: "#222" },
});
