import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import AppBackground from "./components/AppBackground"; 
// 🔥 전체 앱 공통 배경 (고정 데코 이미지)



// 앱 전체의 라우팅 구조와 공통 테마 설정을 담당하는 Root Layout
export default function RootLayout() {


  // 현재는 고정값 "light" 사용.
  // 나중에는 useColorScheme() 또는 사용자 설정 기반으로 동적 변경 가능.
  const colorScheme = "light";

  return (
    // ThemeProvider : Navigation에서 사용하는 테마 전체 적용
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>

      {/* ---------------------------------------------------------
          🎨 전체 앱 공통 배경 (모든 페이지 뒤에 Position: absolute로 깔림)
          pointerEvents="none" 처리로 모든 터치 이벤트 무시 → UI 간섭 없음
        --------------------------------------------------------- */}
      <AppBackground />

      {/* ---------------------------------------------------------
        📌 페이지 렌더링 영역 (Stack Navigator)
        headerShown: false → 각 페이지에서 커스텀 헤더 사용 가능
      --------------------------------------------------------- */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* 휴대폰 기본 상태바 표시 */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
