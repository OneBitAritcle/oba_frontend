// app/(auth)/_layout.tsx
import { Stack } from "expo-router";
import AppBackground from "../../src/components/AppBackground";


export default function AuthLayout() {
  return (
    <>
      <AppBackground />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}