import { Tabs } from "expo-router";
import { View } from "react-native";
import AppBackground from "../../src/components/AppBackground";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <AppBackground />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
            height: 60,
            borderTopWidth: 0
          }
        }}
      >
        <Tabs.Screen name="index" options={{ title: "홈" }} />
        <Tabs.Screen name="my" options={{ title: "MY" }} />
        <Tabs.Screen name="report" options={{ title: "리포트" }} />
        <Tabs.Screen name="wrongArticles" options={{ title: "오답 노트" }} />
      </Tabs>
    </View>
  );
}
