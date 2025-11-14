import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
// import { useColorScheme } from '@/hooks/use-color-scheme'; // 나중에 다크모드 자동 감지 기능 복원 가능


// 앱 전체의 라우팅 구조와 공통 테마 설정을 담당하는 Root Layout
export default function RootLayout() {

  // 현재는 고정값 "light" 사용.
  // 나중에는 useColorScheme() 또는 사용자 설정 기반으로 동적 변경 가능.
  const colorScheme = "light";

  return (
    // ThemeProvider : Navigation에서 사용하는 테마(색상, 스타일 등)를 설정하는 컨텍스트
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      
      {/* 
        Stack : expo-router의 기본 Stack Navigator
        screenOptions = { headerShown: false }
        → 모든 페이지에서 상단 헤더(네비게이션 바)를 숨김.
        → 개별 페이지에서 필요하면 직접 커스텀 헤더를 만들 수 있음.
      */}
      <Stack screenOptions={{ headerShown: false }} />

      {/*
        StatusBar : 휴대폰 상단의 상태바 설정 (시간, 배터리, 와이파이 표시 영역)
        style="auto" → 밝은 화면에서는 어두운 텍스트, 어두운 화면에서는 밝은 텍스트 자동 적용.
      */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
