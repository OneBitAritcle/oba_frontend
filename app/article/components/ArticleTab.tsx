import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ArticleTab({ article }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {/* 카테고리 */}
      <Text style={styles.category}>{article.category}</Text>

      {/* 제목 */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{article.title}</Text>
      </View>

      {/* 날짜 + 출처 */}
      <Text style={styles.meta}>
        {article.date} · {article.source}
      </Text>

      {/* 키워드 */}
      <View style={styles.keywords}>
        {article.keywords.map((kw, idx) => (
          <View key={idx} style={styles.tag}>
            <Text style={styles.tagText}>#{kw.word}</Text>
          </View>
        ))}
      </View>

      {/* 본문 */}
      <Text style={styles.content}>{article.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20 },

  category: { color: "#666", fontSize: 14, marginBottom: 6 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  title: { flex: 1, fontSize: 20, fontWeight: "700", color: "#222" },

  meta: { fontSize: 12, color: "#777", marginTop: 4 },

  keywords: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 14,
    gap: 6,
  },

  tag: {
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  tagText: { fontSize: 12, color: "#444" },

  content: { fontSize: 15, lineHeight: 22, color: "#333", marginTop: 10 },
});
