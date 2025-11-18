import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TabBar({ activeTab, setActiveTab, goHome }) {
  return (
    <SafeAreaView
      edges={["top"]} 
      style={{
        backgroundColor: "transparent",
      }}
    >
      <View style={{ paddingTop: 40 }}>
        <BlurView
          intensity={20}
          tint="light"
          style={styles.blurBar}
        >
          <TouchableOpacity onPress={goHome} style={styles.backBtn}>
            <Text style={styles.backText}>{"<"}</Text>
          </TouchableOpacity>

          {["기사", "요약", "키워드", "퀴즈"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tabBtn}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blurBar: {
    height: 48,                    // 블러는 상단바 높이만
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
    overflow: "hidden",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.3)",
  },

  backBtn: {
    paddingRight: 10,
  },
  backText: {
    fontSize: 20,
    fontWeight: "600",
  },

  tabBtn: {
    paddingHorizontal: 12,
  },
  tabText: {
    fontSize: 15,
    color: "#888",
  },
  tabTextActive: {
    color: "#222",
    fontWeight: "700",
  },
});
