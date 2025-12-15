// app/(tabs)/article/_layout.tsx

import { Stack } from "expo-router";

export default function ArticleLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    />
  );
}
