import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "react-native-reanimated";
import AppBackground from "./components/AppBackground";
import { SplashScreen } from "expo-router";

// SplashScreen.preventAutoHideAsync();  // 디버그 UI 숨김용 
// 이 코드 때문에 앱에서 실행이 안됐음
// 스플래시(초기 로딩 화면)를 수동 제어하려면 preventAutoHideAsync()와 hideAsync() 쌍이 필요함.

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",  // 🔥 Theme 기본 배경 투명화
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={MyTheme}>
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <AppBackground />

        <View style={{ flex: 1, backgroundColor: "transparent" }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="article" options={{ headerShown: false }} /> */}
          </Stack>
        </View>

        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}
