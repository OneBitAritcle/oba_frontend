import { View, Text, StyleSheet, Image } from "react-native";

export default function KeywordTab({ keywords }) {
  // 키워드 설명(추후 API 연동 가능)
  const keywordDescriptions = {
    AI: "인공지능 기술 전반을 의미하며 산업 혁신을 주도하고 있음.",
    데이터: "기업 경쟁력의 핵심 자원으로 분석·전략 수립 과정에서 중요한 역할.",
    산업혁신: "기술 기반의 새로운 방식으로 산업 구조를 변화시키는 흐름.",
    비즈니스: "기업의 전략, 시장 대응, 조직 운영 전반과 연결되는 개념.",
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>🔖 키워드 분석</Text>

      {/* 키워드 + 설명 */}
      {keywords.map((kw, idx) => (
        <View key={idx} style={styles.keywordBox}>
          <Text style={styles.keywordTitle}>{kw}</Text>
          <Text style={styles.keywordDesc}>
            {keywordDescriptions[kw] || "관련 키워드 설명이 제공되지 않았습니다."}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 18,
    color: "#222",
  },

  // 배경 이미지 (마이페이지 스타일)
  decoration: {
    position: "absolute",
    width: 70,
    height: 70,
    opacity: 0.12,
  },

  // 키워드 박스
  keywordBox: {
    backgroundColor: "#ffffffdd",
    marginBottom: 18,
    padding: 14,
    borderRadius: 12,
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },

  keywordTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },

  keywordDesc: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
  },
});
