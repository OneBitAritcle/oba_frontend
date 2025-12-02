import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import * as AuthSession from "expo-auth-session";

const { width, height } = Dimensions.get("window");
const BACKEND = "http://43.200.179.159:9000";

export default function Login() {
  function loginWith(provider: string) {
    const redirect = AuthSession.makeRedirectUri({ path: "oauth" });

    const url =
      `${BACKEND}/oauth2/authorization/${provider}` +
      `?redirect_uri=${encodeURIComponent(redirect)}`;

    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/knight/hand.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>한입기사</Text>
      <Text style={styles.subtitle}>One Bite Article</Text>

      <View style={styles.btnWrap}>
        {/* Google */}
        <TouchableOpacity
          style={[styles.btn, styles.google]}
          onPress={() => loginWith("google")}
        >
          <Image
            source={require("../../assets/icons/google.png")}
            style={styles.icon}
          />
          <Text style={styles.btnText}>구글로 로그인</Text>
        </TouchableOpacity>

        {/* Kakao */}
        <TouchableOpacity
          style={[styles.btn, styles.kakao]}
          onPress={() => loginWith("kakao")}
        >
          <Image
            source={require("../../assets/icons/kakao-talk.png")}
            style={styles.icon}
          />
          <Text style={[styles.btnText, { color: "#3B1E1E" }]}>
            카카오로 로그인
          </Text>
        </TouchableOpacity>

        {/* Naver */}
        <TouchableOpacity
          style={[styles.btn, styles.naver]}
          onPress={() => loginWith("naver")}
        >
          <Image
            source={require("../../assets/icons/naver.png")}
            style={styles.icon}
          />
          <Text style={styles.btnText}>네이버로 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: width * 0.55,
    height: height * 0.23,
    marginBottom: 16,
  },
  title: { fontSize: 32, fontWeight: "800", color: "#333" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 4, marginBottom: 42 },
  btnWrap: { width: "85%", gap: 14, alignItems: "center" },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
    justifyContent: "center",
    width: "100%",
  },
  icon: { width: 20, height: 20, resizeMode: "contain" },
  google: { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#DDD" },
  kakao: { backgroundColor: "#FEE500" },
  naver: { backgroundColor: "#03C75A" },
  btnText: { fontSize: 16, fontWeight: "600", color: "#222" },
});
