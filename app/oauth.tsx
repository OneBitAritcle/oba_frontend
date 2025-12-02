import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { saveToken } from "@/api/auth";

export default function OAuthScreen() {
  const router = useRouter();
  const { access, refresh } = useLocalSearchParams();

  useEffect(() => {
    if (!access || !refresh) return;

    saveToken(access as string, refresh as string)
      .then(() => router.replace("/")); // 홈 이동
  }, [access, refresh]);

  return null;
}