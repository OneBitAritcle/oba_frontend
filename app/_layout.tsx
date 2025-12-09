import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "react-native-reanimated";

import * as Linking from "expo-linking";
import AppBackground from "../src/components/AppBackground";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={MyTheme}>
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <AppBackground />

        <View style={{ flex: 1 }}>
          <Stack
            initialRouteName="index"  // 🔥 로그인 체크 화면을 첫번째로 강제 등록
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </View>

        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}
