import { useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { getAccessToken } from "@/lib/storage";

export default function RootLayout() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = await getAccessToken();
      if (token) {
        router.replace("/");   // 자동 로그인
      } else {
        router.replace("/login");
      }
      setReady(true);
    };
    init();
  }, []);

  if (!ready) return null;

  return <Slot />;
}
