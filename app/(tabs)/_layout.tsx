// oba_frontend/app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false, 
        tabBarStyle: { display: 'none' } 
      }}
    >
      <Tabs.Screen name="index" options={{ title: "홈" }} />
      <Tabs.Screen name="wrongArticles/index" options={{ title: "오답노트" }} />
      <Tabs.Screen name="report/index" options={{ title: "리포트" }} />
      <Tabs.Screen name="my/index" options={{ title: "마이" }} />
    </Tabs>
  );
}