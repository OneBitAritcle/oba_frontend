import { View, Text, TouchableOpacity } from "react-native";

export default function TabBar({ activeTab, setActiveTab, goHome }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "white",
      }}
    >
      {/* 홈 버튼 */}
      <TouchableOpacity onPress={goHome} style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 20 }}>{"<"}</Text>
      </TouchableOpacity>

      {/* 탭 목록 */}
      {["기사", "요약", "키워드", "퀴즈"].map((tabName) => (
        <TouchableOpacity
          key={tabName}
          onPress={() => setActiveTab(tabName)}
          style={{ paddingHorizontal: 16 }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: activeTab === tabName ? "700" : "400",
              color: activeTab === tabName ? "#222" : "#777",
            }}
          >
            {tabName}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
