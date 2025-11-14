// app/report.tsx

import { View, Text, StyleSheet } from "react-native";

export default function ReportPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📄 Report Page (빈 페이지)</Text>
      <Text style={styles.sub}>여기에 나중에 기능을 넣으면 됩니다!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F3EA",
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
  },
  sub: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
});
