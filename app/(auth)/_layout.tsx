// app/(auth)/_layout.tsx
import { Stack } from "expo-router";
import { View } from "react-native";
import AppBackground from "../../src/components/AppBackground";

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <AppBackground />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </View>
  );
}
