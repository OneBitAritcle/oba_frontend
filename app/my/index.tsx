import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
// → 버튼 클릭했을 때 /settings, /my/solved 등으로 이동시키기 위한 router 객체

export default function MyPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* -----------------------------------------------------
           👤 프로필 카드 (배경 + 프로필 이미지 + 닉네임)
         ----------------------------------------------------- */}
      <View style={styles.profileCard}>

        {/* ⚙️ 설정 버튼 → /settings 이동 */}
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => router.push("/settings")}
        >
          <Text style={styles.settingIcon}>⚙️</Text>
        </TouchableOpacity>

        {/* 프로필 정보 (사진 + id + 닉네임) */}
        <View style={styles.profileInfo}>
          <Image
            source={require("../../assets/images/basic_profile.png")}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.userId}>id: fad67ds744asd4g45</Text>
            <Text style={styles.userName}>닉네임: 김제니</Text>
          </View>
        </View>
      </View>

      {/* -----------------------------------------------------
           📋 메뉴 리스트 (마이페이지 기능 목록)
         ----------------------------------------------------- */}
      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>메뉴</Text>
        <View style={styles.menuLine} />

        {/* 푼 문제 보기 */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/my/solved")}
        >
          <Text style={styles.menuText}>푼 문제 보기</Text>
        </TouchableOpacity>

        {/* 틀린 문제 보기 */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/my/wrong")}
        >
          <Text style={styles.menuText}>틀린 문제 보기</Text>
        </TouchableOpacity>
      </View>

      {/* -----------------------------------------------------
           🎨 배경 데코 이미지들 (반투명 피자·햄버거 등)
           → purely decorative UI 요소
         ----------------------------------------------------- */}
      <Image
        source={require("../../assets/pizza/pep.png")}
        style={[styles.decoration, { top: 100, left: 30 }]}
      />

      <Image
        source={require("../../assets/food/burger.png")}
        style={[styles.decoration, { top: 200, left: 600 }]}
      />

      <Image
        source={require("../../assets/food/potato.png")}
        style={[styles.decoration, { top: 150, right: 60 }]}
      />

      <Image
        source={require("../../assets/pizza/mar.png")}
        style={[styles.decoration, { top: 600, right: 100 }]}
      />

      <Image
        source={require("../../assets/food/ckin.png")}
        style={[styles.decoration, { top: 700, left: 300 }]}
      />

      <Image
        source={require("../../assets/food/chic.png")}
        style={[styles.decoration, { bottom: 150, right: 250 }]}
      />

      <Image
        source={require("../../assets/pizza/hwaa.png")}
        style={[styles.decoration, { bottom: 60, right: 500 }]}
      />
    </View>
  );
}


// -----------------------------------------------------
// 📌 스타일 정의
// -----------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFF",   // 전체 페이지 기본 배경
    alignItems: "center",
    paddingTop: 80,               // 상단 여백
  },

  // 👤 프로필 카드
  profileCard: {
    position: "relative",
    backgroundColor: "#DCE8F9",
    borderRadius: 12,
    width: "85%",
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 50,
  },

  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },

  settingButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },

  settingIcon: {
    fontSize: 22,
    color: "#444",
  },

  userId: { fontSize: 13, color: "#333" },
  userName: { fontSize: 15, fontWeight: "600", color: "#111" },

  // 📋 메뉴 영역
  menuSection: {
    width: "85%",
  },

  menuTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
    color: "#222",
  },

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

  // 🎨 페이지 배경의 데코 이미지
  decoration: {
    position: "absolute",
    width: 50,
    height: 50,
    opacity: 0.15,  // 흐린 효과
  },
});
