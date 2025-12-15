import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 상단 헤더 숨김
      }}
    />
  );
}
