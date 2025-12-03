import { Slot, useRouter, useNavigationContainerRef } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const nav = useNavigationContainerRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      setReady(true);
      let token = null;

      if (Platform.OS !== "web") {
        token = await SecureStore.getItemAsync("accessToken");
      }

      const check = setInterval(() => {
        if (nav.isReady()) {
          clearInterval(check);
          router.replace(token ? "/(tabs)/home" : "/(auth-group)/login");
        }
      }, 50);
    }

    init();
  }, []);

  if (!ready) return null;
  return <Slot />;
}
