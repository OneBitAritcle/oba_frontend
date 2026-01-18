// oba_frontend/app/_layout.tsx
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";

// 만약 에러가 난다면 "../src/components/AppBackground" 로 경로를 수정해보세요.
import AppBackground from "./components/AppBackground"; 

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        {/* 전체 배경 적용 */}
        <AppBackground />
        
        {/* 화면이 표시되는 영역 */}
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}