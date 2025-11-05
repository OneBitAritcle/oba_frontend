import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F3EA",
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 20 }}>
        한입기사
      </Text>

      {/* 기사 목록으로 이동 */}
      <Link href="/article">
        <TouchableOpacity
          style={{
            backgroundColor: "#222",
            paddingVertical: 12,
            paddingHorizontal: 40,
            borderRadius: 24,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>기사 보러가기</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
