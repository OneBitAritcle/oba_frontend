import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const BACKEND = "http://localhost:8080";

export default function Login() {
  const redirectUri = makeRedirectUri({
    scheme: "myapp",
  });

  const openOAuth = async (provider: string) => {
    await WebBrowser.openBrowserAsync(
      `${BACKEND}/oauth2/authorization/${provider}?redirect_uri=${redirectUri}`
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => openOAuth("google")}>
        <Image source={require("../../assets/icons/google.png")} style={styles.icon} />
        <Text>구글로 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => openOAuth("kakao")}>
        <Image source={require("../../assets/icons/kakao-talk.png")} style={styles.icon} />
        <Text>카카오로 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => openOAuth("naver")}>
        <Image source={require("../../assets/icons/naver.png")} style={styles.icon} />
        <Text>네이버로 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  btn: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 220,
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 6,
  },
});
