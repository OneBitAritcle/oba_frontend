// oba_fronted/app/article/components/ArticleTab.tsx
import { View, Text, ScrollView, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";

interface ArticleTabProps {
  article: any;
  onMoveToQuiz: () => void;
}

export default function ArticleTab({ article, onMoveToQuiz }: ArticleTabProps) {
  const { width } = useWindowDimensions();
  const [showSummary, setShowSummary] = useState(false);

  // 1. 본문 데이터
  const contentList = article.content || [];

  // 2. GPT 데이터 (스네이크 케이스 우선 확인)
  const gptData = article.gpt_result || article.gptResult || {};

  // 3. 태그(키워드) 추출 로직
  const rawKeywords = gptData.keywords || article.keywords || [];
  
  const tags = Array.isArray(rawKeywords) && rawKeywords.length > 0
    ? rawKeywords.map((k: any) => typeof k === 'string' ? k : k.keyword).slice(0, 3) 
    : ["IT/과학", "트렌드"]; 

  // 4. 요약문 추출 로직
  const summaryText = gptData.summary || article.summary || 
    (article.summaryBullets ? article.summaryBullets.join("\n") : "요약 내용이 없습니다.");

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. 태그 영역 */}
      <View style={styles.tagRow}>
        {tags.map((tag: string, i: number) => (
          <View key={i} style={styles.tagBadge}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* 2. 제목 & 날짜 */}
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.dateInfo}>한입경제 · {article.servingDate || "2026.01.14"}</Text>

      {/* 3. AI 요약 버튼 */}
      <TouchableOpacity 
        style={styles.aiSummaryBtn} 
        activeOpacity={0.8}
        onPress={() => setShowSummary(!showSummary)}
      >
        <Text style={styles.aiSummaryText}>
            {showSummary ? "AI 요약 접기" : "AI 요약 보기"}
        </Text>
        <Text style={{ fontSize: 18 }}>🤖</Text>
      </TouchableOpacity>

      {/* 요약 내용 */}
      {showSummary && (
        <View style={styles.summaryBox}>
            <Text style={styles.summaryContent}>{summaryText}</Text>
        </View>
      )}

      {/* 4. 구분선 */}
      <View style={styles.divider} />

      {/* 5. 본문 렌더링 */}
      <View style={styles.contentContainer}>
        {contentList.map((text: string, index: number) => {
          if (text.startsWith("<img>")) {
            const imageUrl = text.replace("<img>", "").trim();
            return (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={{
                  width: width - 40,
                  height: 220,
                  borderRadius: 12,
                  marginBottom: 15,
                  resizeMode: "cover"
                }}
              />
            );
          }
          return (
            <Text key={index} style={styles.bodyText}>
              {text}
            </Text>
          );
        })}
      </View>

      {/* 하단 퀴즈 이동 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.quizBtn} onPress={onMoveToQuiz}>
            <Text style={styles.quizBtnText}>퀴즈 풀러 가기 👉</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 50, backgroundColor: "#fff" },
  tagRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  tagBadge: { backgroundColor: "#F2F4F6", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  tagText: { fontSize: 13, color: "#4E5968", fontWeight: "600" },
  title: { fontSize: 24, fontWeight: "bold", color: "#191F28", lineHeight: 34, marginBottom: 10 },
  dateInfo: { fontSize: 14, color: "#8B95A1", marginBottom: 24 },
  aiSummaryBtn: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F9FAFB", paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: "#E5E8EB" },
  aiSummaryText: { fontSize: 16, fontWeight: "700", color: "#4A8CFF" }, 
  summaryBox: { backgroundColor: "#F0F7FF", padding: 20, borderRadius: 12, marginBottom: 20 },
  summaryContent: { fontSize: 15, lineHeight: 24, color: "#333" },
  divider: { height: 1, backgroundColor: "#F2F4F6", marginVertical: 20 },
  contentContainer: { marginBottom: 30 },
  bodyText: { fontSize: 17, lineHeight: 28, color: "#333", marginBottom: 16 },
  footer: { alignItems: "center", marginTop: 20 },
  quizBtn: { backgroundColor: "#191F28", paddingHorizontal: 24, paddingVertical: 14, borderRadius: 30 },
  quizBtnText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
});