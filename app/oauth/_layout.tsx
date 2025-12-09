import { Stack } from "expo-router";

export default function OAuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none", // 로딩 화면 빠르게 전환
      }}
    />
  );
}
