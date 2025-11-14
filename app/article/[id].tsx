import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";


// ------------------------------------------------------
// 🔥 상단 탭바
// ------------------------------------------------------
function ArticleTabBar({ activeTab, setActiveTab, goHome }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "white",
      }}
    >
      {/* 홈으로 돌아가기 */}
      <TouchableOpacity onPress={goHome} style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 20 }}>{"<"}</Text>
      </TouchableOpacity>

      {/* 탭 4개 */}
      {["기사", "요약", "키워드", "퀴즈"].map((tabName) => (
        <TouchableOpacity
          key={tabName}
          onPress={() => setActiveTab(tabName)}
          style={{ paddingHorizontal: 16 }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: activeTab === tabName ? "700" : "400",
              color: activeTab === tabName ? "#222" : "#777",
            }}
          >
            {tabName}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}



// ------------------------------------------------------
// 🔥 기사 상세 메인 페이지
// ------------------------------------------------------
export default function ArticleDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // 🔥 탭 상태
  const [activeTab, setActiveTab] = useState("기사");

  // 🔥 퀴즈 상태 (기존 quiz/[id].tsx에서 가져온 상태)
  const [selected, setSelected] = useState({});
  const [isGraded, setIsGraded] = useState({});
  const [isOpen, setIsOpen] = useState({});

  // 🔥 더미 기사 데이터
  const dummyArticle = {
    id,
    category: "AI / 데이터",
    title: "AI & 데이터 서밋 2025, 기업의 새로운 전환점",
    date: "2025.10.20",
    source: "한입경제",
    summary:
      "AI 기술의 확산과 데이터 기반 혁신이 기업 경쟁력을 좌우한다는 분석.",
    keywords: ["AI", "데이터", "산업혁신", "비즈니스"],
    content: `AI & 데이터 서밋 2025에서는 AI의 산업적 확산과 데이터 활용 전략이 주요 의제로 다뤄졌습니다. 
기업들은 AI를 통한 자동화, 맞춤형 서비스, 데이터 기반 의사결정 강화에 주목하고 있습니다.`,
  };

  // 🔥 퀴즈 데이터
  const quizList = [
    {
      question: "Q1. 'AI & 데이터 서밋 2025'의 주요 의제는?",
      options: [
        "AI 도입 전략과 데이터 활용",
        "패션 산업 트렌드",
        "해양 생태계 보호",
        "스포츠 과학 기술",
      ],
      answer: 0,
      explanation:
        "AI & 데이터 서밋 2025에서는 AI와 데이터 전략, 인프라 혁신 등이 논의되었습니다.",
    },
    {
      question: "Q2. 한입기사의 주요 기능은?",
      options: ["뉴스 요약 제공", "음악 재생", "지도 탐색", "게임 제공"],
      answer: 0,
      explanation:
        "한입기사는 사용자가 빠르게 뉴스를 요약해 볼 수 있도록 하는 서비스입니다.",
    },
  ];

  // 🔥 퀴즈 로직
  const handleSelect = (qIndex, oIndex) => {
    setSelected((prev) => ({ ...prev, [qIndex]: oIndex }));
  };

  const handleGrade = (qIndex) => {
    setIsGraded((prev) => ({ ...prev, [qIndex]: true }));
    setIsOpen((prev) => ({ ...prev, [qIndex]: true }));
  };

  const toggleOpen = (qIndex) => {
    setIsOpen((prev) => ({ ...prev, [qIndex]: !prev[qIndex] }));
  };



  return (
    <View style={{ flex: 1, backgroundColor: "#F7F3EA" }}>
      {/* 상단 탭바 */}
      <ArticleTabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        goHome={() => router.push("/")}
      />



      {/* -------------------------------------------------- */}
      {/* 🔥 1) 기사 탭 */}
      {/* -------------------------------------------------- */}
      {activeTab === "기사" && (
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.category}>{dummyArticle.category}</Text>

          <View style={styles.headerRow}>
            <Text style={styles.title}>{dummyArticle.title}</Text>
          </View>

          <Text style={styles.meta}>
            {dummyArticle.date} · {dummyArticle.source}
          </Text>

          <View style={styles.keywords}>
            {dummyArticle.keywords.map((kw, idx) => (
              <View key={idx} style={styles.tag}>
                <Text style={styles.tagText}>#{kw}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.content}>{dummyArticle.content}</Text>
        </ScrollView>
      )}



      {/* -------------------------------------------------- */}
      {/* 🔥 2) 요약 탭 */}
      {/* -------------------------------------------------- */}
      {activeTab === "요약" && (
        <View style={{ padding: 20 }}>
          <Text style={styles.tabTitle}>🤖 AI 요약</Text>
          <Text style={styles.tabContent}>{dummyArticle.summary}</Text>
        </View>
      )}



      {/* -------------------------------------------------- */}
      {/* 🔥 3) 키워드 탭 */}
      {/* -------------------------------------------------- */}
      {activeTab === "키워드" && (
        <View style={{ padding: 20 }}>
          <Text style={styles.tabTitle}>🔖 관련 키워드</Text>

          <View style={styles.keywordList}>
            {dummyArticle.keywords.map((kw, idx) => (
              <View key={idx} style={styles.keywordItem}>
                <Text style={{ fontSize: 16 }}>#{kw}</Text>
              </View>
            ))}
          </View>
        </View>
      )}



      {/* -------------------------------------------------- */}
      {/* 🔥 4) 퀴즈 탭 (기존 quiz/[id].tsx 전체 이식) */}
      {/* -------------------------------------------------- */}
      {activeTab === "퀴즈" && (
        <ScrollView style={{ padding: 20 }}>
          <Text style={styles.quizHeader}>🧠 기사 {id} 퀴즈</Text>

          {quizList.map((quiz, qIndex) => {
            const userAnswer = selected[qIndex];
            const graded = isGraded[qIndex];
            const open = isOpen[qIndex];
            const isCorrect = userAnswer === quiz.answer;

            return (
              <View key={qIndex} style={styles.quizBlock}>
                <Text style={styles.question}>{quiz.question}</Text>

                {quiz.options.map((opt, oIndex) => {
                  const selectedOption = userAnswer === oIndex;
                  return (
                    <TouchableOpacity
                      key={oIndex}
                      disabled={graded}
                      onPress={() => handleSelect(qIndex, oIndex)}
                      style={[
                        styles.option,
                        selectedOption && styles.selected,
                        graded &&
                          oIndex === quiz.answer && {
                            backgroundColor: "#DFF5CC",
                          },
                        graded &&
                          selectedOption &&
                          oIndex !== quiz.answer && {
                            backgroundColor: "#FDDCDC",
                          },
                      ]}
                    >
                      <Text style={styles.optionText}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}

                <TouchableOpacity
                  onPress={() => handleGrade(qIndex)}
                  disabled={graded || selected[qIndex] === undefined}
                  style={[
                    styles.gradeBtn,
                    graded && styles.disabledBtn,
                    selected[qIndex] === undefined && styles.disabledBtn,
                  ]}
                >
                  <Text style={styles.gradeText}>
                    {graded ? "채점 완료" : "채점하기"}
                  </Text>
                </TouchableOpacity>

                {graded && (
                  <View style={styles.explanationWrapper}>
                    <TouchableOpacity onPress={() => toggleOpen(qIndex)}>
                      <Image
                        source={
                          open
                            ? require("../../assets/icons/toggle_1.png")
                            : require("../../assets/icons/toggle_2.png")
                        }
                        style={styles.pizzaIcon}
                      />
                    </TouchableOpacity>

                    {open && (
                      <View style={styles.explanationBox}>
                        <Text
                          style={[
                            styles.resultText,
                            { color: isCorrect ? "#2E7D32" : "#C62828" },
                          ]}
                        >
                          {isCorrect ? "🎉 정답입니다!" : "❌ 오답입니다!"}
                        </Text>

                        <Text style={styles.explanation}>
                          {quiz.explanation}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}



// ------------------------------------------------------
// 🎨 스타일
// ------------------------------------------------------
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

  // 요약 / 키워드 탭
  tabTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },
  tabContent: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },
  keywordList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  keywordItem: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  // 퀴즈
  quizHeader: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  quizBlock: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 14,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selected: {
    borderColor: "#ff9f00",
    backgroundColor: "#fff5e0",
  },
  gradeBtn: {
    marginTop: 10,
    backgroundColor: "#222",
    paddingVertical: 10,
    borderRadius: 8,
  },
  gradeText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  disabledBtn: { backgroundColor: "#aaa" },

  explanationWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 12,
  },
  pizzaIcon: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  explanationBox: {
    flex: 1,
    backgroundColor: "#daedffff",
    borderRadius: 10,
    padding: 12,
  },
  resultText: { fontWeight: "600", fontSize: 15, marginBottom: 4 },
  explanation: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
