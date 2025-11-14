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
// useLocalSearchParams → 현재 페이지의 [id] 값을 가져오는 hook
// useRouter → 다른 페이지로 이동(push 등) 할 때 사용

export default function ArticleDetail() {
  const router = useRouter();

  // URL 에서 /article/[id] 형태로 들어온 id 값을 받음
  // 예: 사용자가 /article/3 으로 들어오면 id = "3"
  const { id } = useLocalSearchParams();

  // "요약 보기" 모달 on/off 상태
  const [modalVisible, setModalVisible] = useState(false);

  // 실제 API 연동 전, 구조를 잡기 위한 더미 데이터
  // 나중에 fetch로 서버에서 데이터 가져와 대체하면 됨.
  const dummyArticle = {
    id,
    category: "AI / 데이터",
    title: "AI & 데이터 서밋 2025, 기업의 새로운 전환점",
    date: "2025.10.20",
    source: "한입경제",
    summary: "AI 기술의 확산과 데이터 기반 혁신이 기업 경쟁력을 좌우한다는 분석.",
    keywords: ["AI", "데이터", "산업혁신", "비즈니스"],

    // 본문 일부 (여기도 원래 서버 데이터 들어갈 부분)
    content: `AI & 데이터 서밋 2025에서는 AI의 산업적 확산과 데이터 활용 전략이 주요 의제로 다뤄졌습니다. 
기업들은 AI를 통한 자동화, 맞춤형 서비스, 데이터 기반 의사결정 강화에 주목하고 있습니다.`,
  };

  return (
    <View style={styles.container}>
      {/* 전체 내용 스크롤 가능 */}
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* 🧭 카테고리 표시 */}
        <Text style={styles.category}>{dummyArticle.category}</Text>

        {/* 📰 제목 + 요약 모달 버튼 */}
        <View style={styles.headerRow}>
          {/* 기사 제목 */}
          <Text style={styles.title}>{dummyArticle.title}</Text>

          {/* "🤖 요약 보기" 버튼 → 모달 on */}
          <TouchableOpacity
            style={styles.summaryBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.summaryText}>🤖 요약 보기</Text>
          </TouchableOpacity>
        </View>

        {/* 날짜 + 출처 */}
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

      {/* 🧠 퀴즈 풀러가기 (하단 고정 버튼) */}
      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => router.push(`/quiz/${dummyArticle.id}`)}
        // → 현재 기사 ID에 맞는 퀴즈 화면으로 이동
      >
        <Text style={styles.quizText}>🧠 퀴즈 풀러가기</Text>
      </TouchableOpacity>

      {/* 🤖 AI 요약 모달 */}
      <Modal
        transparent={true}            // 배경을 흐리게 보이도록
        visible={modalVisible}        // 모달 열림 여부
        animationType="fade"          // 서서히 나타나는 효과
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>🤖 AI 요약</Text>
            <Text style={styles.modalContent}>{dummyArticle.summary}</Text>

            {/* 닫기 버튼 */}
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


// --------------------------------
// 📌 스타일 정의
// --------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F3EA" },

  // ScrollView 내부 여백
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

  // 하단 고정 버튼
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

  // 모달 배경
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  // 모달 박스
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
