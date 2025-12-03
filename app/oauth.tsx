import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const token = await SecureStore.getItemAsync("accessToken");

      if (token) {
        router.replace("/(tabs)/my");
      } else {
        router.replace("/(auth-group)/login");
      }

      setLoading(false);
    }

    init();
  }, []);

  if (loading) return null;

  return <Slot />;
}
