import { View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";

export default function TabBar({ activeTab, setActiveTab, goHome }) {
  return (
    <BlurView
      intensity={25}
      tint="light"
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
        backgroundColor: "rgba(255,255,255,0.35)", // blur + 투명
      }}
    >
      {/* 뒤로가기 */}
      <TouchableOpacity onPress={goHome} style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: "500" }}>{"<"}</Text>
      </TouchableOpacity>

      {/* 탭 목록 */}
      {["기사", "요약", "키워드", "퀴즈"].map((tabName) => {
        const active = activeTab === tabName;
        return (
          <TouchableOpacity
            key={tabName}
            onPress={() => setActiveTab(tabName)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: active ? "700" : "400",
                color: active ? "#222" : "#555",
              }}
            >
              {tabName}
            </Text>

            {/* 밑줄 강조 */}
            {active && (
              <View
                style={{
                  marginTop: 4,
                  height: 2,
                  backgroundColor: "#333",
                  alignSelf: "stretch",
                  borderRadius: 4,
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
}
