import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function MyPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ⚙️ 설정 버튼 */}
      <TouchableOpacity
        style={styles.settingButton}
        onPress={() => router.push("/settings")}
      >
        <Text style={styles.settingIcon}>⚙️</Text>
      </TouchableOpacity>

      {/* 👤 프로필 카드 */}
      <View style={styles.profileCard}>
        {/* <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
          }}
          style={styles.profileImage}
        /> */}
        <Image source={require("../../assets/images/icon.png")} style={styles.profileImage} />
        <View>
          <Text style={styles.userId}>id: fad67ds744asd4g45</Text>
          <Text style={styles.userName}>닉네임: 김제니</Text>
        </View>
      </View>

      {/* 📋 메뉴 영역 */}
      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>메뉴</Text>
        <View style={styles.menuLine} />

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/my/solved")}
        >
          <Text style={styles.menuText}>푼 문제 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/my/wrong")}
        >
          <Text style={styles.menuText}>틀린 문제 보기</Text>
        </TouchableOpacity>
      </View>

      {/* 🍕🍗 배경 데코 */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
        }}
        style={[styles.decoration, { top: 60, left: 20 }]}
      />
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
        }}
        style={[styles.decoration, { bottom: 80, right: 30 }]}
      />
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1046/1046796.png",
        }}
        style={[styles.decoration, { top: 250, right: 40 }]}
      />
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/883/883407.png",
        }}
        style={[styles.decoration, { bottom: 60, left: 40 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFF",
    alignItems: "center",
    paddingTop: 80,
  },
  settingButton: {
    position: "absolute",
    top: 60,
    right: 24,
  },
  settingIcon: {
    fontSize: 22,
    color: "#444",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCE8F9",
    padding: 18,
    borderRadius: 12,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 50,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  userId: { fontSize: 13, color: "#333" },
  userName: { fontSize: 15, fontWeight: "600", color: "#111" },

  menuSection: {
    width: "85%",
  },
  menuTitle: { fontSize: 20, fontWeight: "700", marginBottom: 6, color: "#222" },
  menuLine: {
    height: 1,
    backgroundColor: "#444",
    marginBottom: 16,
  },
  menuItem: {
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  decoration: {
    position: "absolute",
    width: 50,
    height: 50,
    opacity: 0.15,
  },
});
