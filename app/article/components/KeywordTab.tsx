import { View, Text, StyleSheet } from "react-native";

export default function KeywordTab({ keywords }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔑 주요 키워드</Text>

      {keywords.map((item, index) => (
        <View key={index} style={styles.keywordBox}>
          <Text style={styles.word}># {item.word}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#222",
  },
  keywordBox: {
    marginBottom: 16,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  word: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});
