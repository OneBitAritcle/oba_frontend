// app/quiz/[id].tsx
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function QuizPage() {
  const { id } = useLocalSearchParams();

  // 🧠 더미 퀴즈 데이터
  const quizList = [
    {
      question: "Q1. AI 서밋 2025의 주요 주제는?",
      options: ["AI 전략", "디자인 트렌드", "스포츠 산업", "요리 혁신"],
      answer: 0,
      explanation: "AI 서밋 2025에서는 인공지능 전략과 데이터 활용이 핵심 의제였습니다.",
    },
    {
      question: "Q2. AI 도입의 주요 장애 요인은?",
      options: ["데이터 품질 부족", "AI 과잉 공급", "하드웨어 과잉", "규제 강화"],
      answer: 0,
      explanation: "IDC 조사 결과, 데이터 품질 부족이 가장 큰 장애 요인으로 꼽혔습니다.",
    },
    // ... 나머지 문제도 3~5개 정도
  ];

  // 문제별 상태 관리
  const [selected, setSelected] = useState<{ [key: number]: number | null }>({});
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});
  const [showExplain, setShowExplain] = useState<{ [key: number]: boolean }>({});

  const handleSelect = (qIndex: number, oIndex: number) => {
    setSelected((prev) => ({ ...prev, [qIndex]: oIndex }));
  };

  const handleCheck = (qIndex: number) => {
    setChecked((prev) => ({ ...prev, [qIndex]: true }));
    setShowExplain((prev) => ({ ...prev, [qIndex]: true }));
  };

  const toggleExplain = (qIndex: number) => {
    setShowExplain((prev) => ({ ...prev, [qIndex]: !prev[qIndex] }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Text style={styles.title}>🧠 기사 {id} 퀴즈</Text>

      {quizList.map((quiz, qIndex) => {
        const selectedOpt = selected[qIndex];
        const isChecked = checked[qIndex];
        const isCorrect = selectedOpt === quiz.answer;

        return (
          <View key={qIndex} style={styles.card}>
            <Text style={styles.question}>{quiz.question}</Text>

            {quiz.options.map((opt, oIndex) => {
              const isSelected = selectedOpt === oIndex;
              return (
                <TouchableOpacity
                  key={oIndex}
                  onPress={() => handleSelect(qIndex, oIndex)}
                  style={[
                    styles.option,
                    isSelected && { backgroundColor: "#E6E6E6" },
                  ]}
                >
                  <Text>{opt}</Text>
                </TouchableOpacity>
              );
            })}

            {/* ✅ 문제별 채점 버튼 */}
            {!isChecked ? (
              <TouchableOpacity
                style={styles.checkButton}
                onPress={() => handleCheck(qIndex)}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>채점하기</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.checkButton, { backgroundColor: "#999" }]}
                onPress={() => toggleExplain(qIndex)}
              >
                <Text style={{ color: "white" }}>
                  🍕 {showExplain[qIndex] ? "닫기" : "해설 보기"}
                </Text>
              </TouchableOpacity>
            )}

            {/* ✅ 정답/해설 영역 */}
            {isChecked && showExplain[qIndex] && (
              <View style={styles.explainBox}>
                <Text style={{ fontWeight: "700" }}>
                  {isCorrect ? "🎉 정답입니다!" : "❌ 오답입니다!"}
                </Text>
                <Text style={{ marginTop: 6 }}>{quiz.explanation}</Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F3EA", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  question: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  option: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  checkButton: {
    backgroundColor: "#222",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  explainBox: {
    backgroundColor: "#F1F1F1",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
});
