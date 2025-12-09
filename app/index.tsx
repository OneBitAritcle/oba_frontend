// app/index.tsx
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import jwtDecode from "jwt-decode";

// JWT exp 필드 체크용 타입
type DecodedToken = {
  exp?: number;
};

export default function Index() {
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      console.log("🔥 index.tsx: 로그인 체크 시작");

      // 웹은 로그인 사용 X
      if (Platform.OS === "web") {
        console.log("🌐 Web 환경 → 로그인 필요");
        setChecked(true);
        setLoggedIn(false);
        return;
      }

      // 1) 토큰 가져오기
      const access = await SecureStore.getItemAsync("accessToken");
      console.log("🔑 저장된 accessToken:", access);

      // 저장된 토큰 자체가 없으면 → 로그인 X
      if (!access) {
        console.log("❌ AccessToken 없음 → 로그인 필요");
        setChecked(true);
        setLoggedIn(false);
        return;
      }

      // 2) JWT 만료 여부 확인
      try {
        const decoded = jwtDecode<DecodedToken>(access);
        const now = Date.now() / 1000;

        if (!decoded.exp || decoded.exp < now) {
          console.log("⛔ JWT 만료됨 → SecureStore 초기화");
          await SecureStore.deleteItemAsync("accessToken");
          await SecureStore.deleteItemAsync("refreshToken");
          setChecked(true);
          setLoggedIn(false);
          return;
        }

        // 토큰 유효 → 로그인 성공
        console.log("✅ 유효한 토큰 → 로그인 상태 유지");
        setChecked(true);
        setLoggedIn(true);
      } catch (e) {
        console.log("❌ JWT 파싱 오류 → 토큰 삭제");
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        setChecked(true);
        setLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  // 라우팅 판단 전 준비 중
  if (!checked) return null;

  // 로그인 안 되어 있으면 (auth)/login 이동
  if (!loggedIn) {
    console.log("➡️ Redirect → (auth)/login");
    return <Redirect href="/(auth)/login" />;
  }

  // 로그인 되어 있으면 탭으로 이동
  console.log("➡️ Redirect → (tabs)");
  return <Redirect href="/(tabs)" />;
}
