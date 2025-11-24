import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await SecureStore.getItemAsync("jwt");

      if (!token) {
        router.replace("/(auth)/login");
      }

      setLoading(false);
    };

    checkLogin();
  }, []);

  if (loading) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
