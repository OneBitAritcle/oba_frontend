// oba_frontend/app/(auth)/_layout.tsx
import { Stack } from "expo-router";
// ✅ 여기는 한 단계 위로 올라가야 하므로 "../" 가 맞습니다.
import AppBackground from "../components/AppBackground"; 

export default function AuthLayout() {
  return (
    <>
      <AppBackground />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
    </>
  );
}