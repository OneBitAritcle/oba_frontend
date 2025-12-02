// app/article/components/SummaryTab.tsx

import { ScrollView, Text, StyleSheet } from "react-native";

export default function SummaryTab({ summary }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>{summary}</Text>
      <Text style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 25,
    color: "#333",
  },
});
