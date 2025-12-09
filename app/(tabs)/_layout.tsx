import { Tabs } from "expo-router";
import { View } from "react-native";
import AppBackground from "../../src/components/AppBackground";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <AppBackground />
      <Tabs screenOptions={{ headerShown: false }} />
    </View>
  );
}
