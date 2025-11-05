import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const dummyArticle = {
    id,
    category: "AI / 데이터",
    title: "AI & 데이터 서밋 2025, 기업의 새로운 전환점",
    date: "2025.10.20",
    source: "한입경제",
    summary: "AI 기술의 확산과 데이터 기반 혁신이 기업 경쟁력을 좌우한다는 분석.",
    keywords: ["AI", "데이터", "산업혁신", "비즈니스"],
    content: `AI & 데이터 서밋 2025에서는 AI의 산업적 확산과 데이터 활용 전략이 주요 의제로 다뤄졌습니다. 
기업들은 AI를 통한 자동화, 맞춤형 서비스, 데이터 기반 의사결정 강화에 주목하고 있습니다.`,
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* 🧭 카테고리 */}
        <Text style={styles.category}>{dummyArticle.category}</Text>

        {/* 📰 제목 + 요약 버튼 */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>{dummyArticle.title}</Text>
          <TouchableOpacity
            style={styles.summaryBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.summaryText}>🤖 요약 보기</Text>
          </TouchableOpacity>
        </View>

        {/* 📅 메타데이터 */}
        <Text style={styles.meta}>
          {dummyArticle.date} · {dummyArticle.source}
        </Text>

        {/* 🏷️ 키워드 해시태그 */}
        <View style={styles.keywords}>
          {dummyArticle.keywords.map((kw, idx) => (
            <TouchableOpacity key={idx} style={styles.tag}>
              <Text style={styles.tagText}>#{kw}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 📄 본문 */}
        <Text style={styles.content}>{dummyArticle.content}</Text>
      </ScrollView>

      {/* 🧠 퀴즈 풀러가기 버튼 (하단 고정) */}
      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => router.push(`/quiz/${dummyArticle.id}`)}
      >
        <Text style={styles.quizText}>🧠 퀴즈 풀러가기</Text>
      </TouchableOpacity>

      {/* 🤖 AI 요약 모달 */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>🤖 AI 요약</Text>
            <Text style={styles.modalContent}>{dummyArticle.summary}</Text>

            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F3EA" },
  scroll: { padding: 20, paddingBottom: 100 },
  category: { color: "#666", fontSize: 14, marginBottom: 6 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  title: { flex: 1, fontSize: 20, fontWeight: "700", color: "#222" },
  summaryBtn: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  summaryText: { fontSize: 13, color: "#333" },
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
  quizButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#222",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  quizText: { color: "white", fontSize: 16, fontWeight: "600" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  modalContent: { fontSize: 15, lineHeight: 22, color: "#333", marginBottom: 16 },
  closeButton: {
    alignSelf: "center",
    backgroundColor: "#222",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  closeText: { color: "white", fontSize: 14 },
});
