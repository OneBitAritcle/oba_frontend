// oba_fronted/app/article/components/TabBar.tsx
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBack: () => void;
}

export default function TabBar({ activeTab, setActiveTab, onBack }: TabBarProps) {
  const tabs = ["기사", "키워드", "퀴즈"];

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View style={styles.headerRow}>
          
          {/* ⬅️ 뒤로가기 버튼 */}
          <TouchableOpacity 
            onPress={onBack} 
            style={styles.backBtn}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Ionicons name="arrow-back" size={24} color="#191F28" />
          </TouchableOpacity>

          {/* 탭 리스트 */}
          <View style={styles.tabContainer}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tabBtn,
                    isActive && styles.tabBtnActive,
                  ]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 오른쪽 여백 (균형 맞춤용) */}
          <View style={styles.dummy} />
          
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F6",
    zIndex: 10,
  },
  safeArea: {
    backgroundColor: "#fff",
  },
  headerRow: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F7F8FA",
    borderRadius: 20,
    padding: 4,
  },
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  tabBtnActive: {
    backgroundColor: "#fff",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2 },
      android: { elevation: 2 },
    }),
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#8B95A1",
  },
  tabTextActive: {
    color: "#191F28",
    fontWeight: "700",
  },
  dummy: {
    width: 40,
  },
});