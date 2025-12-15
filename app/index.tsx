// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  console.log("🔥 index.tsx 실행됨");

  // 로그인 체크 아예 비활성화 → 바로 탭 화면 이동
  return <Redirect href="/(tabs)" />;
}
