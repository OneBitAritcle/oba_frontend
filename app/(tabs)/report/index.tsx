// oba_fronted/app/(tabs)/report/index.tsx

import { View, Text, StyleSheet } from "react-native";

export default function ReportPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📄 Report Page</Text>
      <Text style={styles.sub}>학습 리포트 기능이 준비 중입니다!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5FAFF" },
  text: { fontSize: 20, fontWeight: "700" },
  sub: { marginTop: 10, fontSize: 14, color: "#555" },
});