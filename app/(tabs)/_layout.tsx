// app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";
import { View } from "react-native";
import AppBackground from "../components/AppBackground";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* 🔥 전역 배경은 탭 화면에서만 */}
      <AppBackground />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
            height: 60,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen name="index" options={{ title: "홈" }} />
        <Tabs.Screen name="my" options={{ title: "MY" }} />
        <Tabs.Screen name="report" options={{ title: "리포트" }} />
      </Tabs>
    </View>
  );
}
