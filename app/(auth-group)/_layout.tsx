import { Stack } from "expo-router";
import AppBackground from "../components/AppBackground";

export default function AuthLayout() {
  return (
    <>
      <AppBackground />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
