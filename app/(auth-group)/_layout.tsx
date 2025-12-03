import { Slot } from "expo-router";
import AppBackground from "../components/AppBackground";

export default function AuthGroupLayout() {
  return (
    <AppBackground>
      <Slot />
    </AppBackground>
  );
}
