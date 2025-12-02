// app/article/components/ArticleTab.tsx

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function ArticleTab({ article, onMoveToQuiz }) {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const renderLine = (line: string, index: number) => {
    // 1) 이미지
    if (line.startsWith("<img>")) {
      const url = line.replace("<img>", "").trim();
      return (
        <Image
          key={index}
          source={{ uri: url }}
          style={{ width: "100%", height: 180, borderRadius: 10, marginVertical: 10 }}
          resizeMode="cover"
        />
      );
    }

    // 2) 순서 없는 리스트
    if (line.startsWith("<ul>")) {
      return (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>{line.replace("<ul>", "").trim()}</Text>
        </View>
      );
    }

    // 3) 순서 있는 리스트
    if (line.startsWith("<ol>")) {
      const text = line.replace("<ol>", "").trim();
      return (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bullet}>{index + 1}.</Text>
          <Text style={styles.listText}>{text}</Text>
        </View>
      );
    }

    // 4) 일반 텍스트
    return (
      <Text key={index} style={styles.bodyText}>
        {line}
      </Text>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 제목 */}
      <Text style={styles.title}>{article.title}</Text>

      {/* 메타 정보 */}
      <Text style={styles.meta}>
        {article.source} · {article.date}
      </Text>

      {/* 카테고리 */}
      <View style={styles.categoryRow}>
        {(article.categories || []).map((c: string, idx: number) => (
          <View key={idx} style={styles.categoryChip}>
            <Text style={styles.categoryText}>{c}</Text>
          </View>
        ))}
      </View>

      {/* 기사 본문 */}
      {(article.content || []).map((section: any, idx: number) => (
        <View key={idx} style={styles.section}>
          {section.subtitle && (
            <Text style={styles.subtitle}>{section.subtitle}</Text>
          )}

          {(section.body || []).map(renderLine)}
        </View>
      ))}

      {/* 퀴즈 이동 */}
      <TouchableOpacity style={styles.quizBtn} onPress={onMoveToQuiz}>
        <Text style={styles.quizBtnText}>퀴즈 풀러 가기 →</Text>
      </TouchableOpacity>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  meta: {
    color: "#777",
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  categoryChip: {
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  categoryText: { color: "#444", fontSize: 13 },
  section: {
    marginBottom: 26,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
    color: "#333",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bullet: {
    width: 20,
    fontSize: 15,
    fontWeight: "700",
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  quizBtn: {
    backgroundColor: "#2C6EF2",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  quizBtnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
