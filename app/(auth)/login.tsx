// oba_frontend/app/(auth)/login.tsx

import { View, Text, TouchableOpacity, Image, StyleSheet, useWindowDimensions, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser"; 
import * as Linking from "expo-linking";       
import * as SecureStore from "expo-secure-store"; 

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const BACKEND_URL = "http://dev.onebitearticle.com:9000";
  const REDIRECT_URI = "exp://192.168.219.101:8081/--/oauth/callback"; 

  const handleLogin = async (provider: string) => {
    try {
      const authUrl = `${BACKEND_URL}/oauth2/authorization/${provider.toLowerCase()}`;
      console.log(`📡 [Login] 시작: ${authUrl}`);
      
      // 브라우저 열기
      const result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);

      if (result.type === "success" && result.url) {
        console.log("🔗 [WebBrowser] 결과 URL:", result.url);
        
        const { queryParams } = Linking.parse(result.url);
        
        // 🚨 [수정 완료] 로그에 찍힌 이름 그대로 사용!
        const accessToken = queryParams?.access_token;   
        const refreshToken = queryParams?.refresh_token; 

        if (accessToken) {
          console.log("✅ [Login] 토큰 획득 성공!");
          
          // 문자열인지 확인 후 저장 (배열일 경우 첫 번째 요소 사용)
          const accessStr = Array.isArray(accessToken) ? accessToken[0] : accessToken;
          const refreshStr = Array.isArray(refreshToken) ? refreshToken[0] : refreshToken;

          await SecureStore.setItemAsync("accessToken", accessStr);
          if (refreshStr) {
            await SecureStore.setItemAsync("refreshToken", refreshStr);
          }

          Alert.alert("환영합니다!", "성공적으로 로그인되었습니다.", [
            { text: "시작하기", onPress: () => router.replace("/(tabs)") },
          ]);
        } else {
          console.log("⚠️ 토큰이 없습니다. 파라미터:", queryParams);
        }
      } else {
        console.log("❌ [Login] 취소됨/실패:", result.type);
      }

    } catch (error) {
      console.error("❌ 로그인 에러:", error);
      Alert.alert("오류", "로그인 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/knight/hand.png")}
        style={[{ width: width * 0.55, height: height * 0.23, marginBottom: 16 }]}
        resizeMode="contain"
      />
      <Text style={styles.title}>한입기사</Text>
      <Text style={styles.subtitle}>One Bite Article</Text>

      <View style={styles.btnWrap}>
        <TouchableOpacity style={[styles.btn, styles.google]} onPress={() => handleLogin("google")}>
          <Image source={require("../../assets/icons/google.png")} style={styles.icon} />
          <Text style={styles.btnText}>구글로 로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.kakao]} onPress={() => handleLogin("kakao")}>
          <Image source={require("../../assets/icons/kakao-talk.png")} style={styles.icon} />
          <Text style={[styles.btnText, { color: "#3B1E1E" }]}>카카오로 로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.naver]} onPress={() => handleLogin("naver")}>
          <Image source={require("../../assets/icons/naver.png")} style={styles.icon} />
          <Text style={styles.btnText}>네이버로 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 },
  title: { fontSize: 32, fontWeight: "800", color: "#333" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 4, marginBottom: 42 },
  btnWrap: { width: "85%", gap: 14, alignItems: "center" },
  btn: { flexDirection: "row", alignItems: "center", paddingVertical: 14, borderRadius: 12, gap: 10, justifyContent: "center", width: "100%" },
  icon: { width: 20, height: 20, resizeMode: "contain" },
  google: { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#DDD" },
  kakao: { backgroundColor: "#FEE500" },
  naver: { backgroundColor: "#03C75A" },
  btnText: { fontSize: 16, fontWeight: "600", color: "#222" },
});