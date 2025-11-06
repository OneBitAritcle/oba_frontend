import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function QuizPage() {
  const { id } = useLocalSearchParams();

  // 🧩 더미 퀴즈 데이터
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
      explanation: "한입기사는 사용자가 빠르게 뉴스를 요약해 볼 수 있도록 하는 서비스입니다.",
    },
  ];

  // 🔹 각 문제별 상태 저장
  const [selected, setSelected] = useState<{ [key: number]: number | null }>({});
  const [isGraded, setIsGraded] = useState<{ [key: number]: boolean }>({});
  const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});

  const handleSelect = (qIndex: number, oIndex: number) => {
    setSelected((prev) => ({ ...prev, [qIndex]: oIndex }));
  };

  const handleGrade = (qIndex: number) => {
    setIsGraded((prev) => ({ ...prev, [qIndex]: true }));
    setIsOpen((prev) => ({ ...prev, [qIndex]: true })); // 기본 열림
  };

  const toggleOpen = (qIndex: number) => {
    setIsOpen((prev) => ({ ...prev, [qIndex]: !prev[qIndex] }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🧠 기사 {id} 퀴즈</Text>

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
                      oIndex === quiz.answer && { backgroundColor: "#DFF5CC" },
                    graded &&
                      selectedOption &&
                      oIndex !== quiz.answer && { backgroundColor: "#FDDCDC" },
                  ]}
                >
                  <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
              );
            })}

            {/* 채점하기 버튼 */}
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

            {/* 🍕 피자 토글 버튼 */}
            {graded && (
              <TouchableOpacity
                onPress={() => toggleOpen(qIndex)}
                style={styles.pizzaToggle}
              >
                <Image
                  source={
                    open
                      ? require("../../assets/icons/pizza_down.png") // 🔽 피자
                      : require("../../assets/icons/pizza_right.png") // ▶️ 피자
                  }
                  style={{ width: 36, height: 36 }}
                />
              </TouchableOpacity>
            )}

            {/* 📘 해설 표시 영역 */}
            {graded && open && (
              <View style={styles.explanationBox}>
                <Text
                  style={[
                    styles.resultText,
                    { color: isCorrect ? "#2E7D32" : "#C62828" },
                  ]}
                >
                  {isCorrect ? "🎉 정답입니다!" : "❌ 오답입니다!"}
                </Text>
                <Text style={styles.explanation}>{quiz.explanation}</Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3EA",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
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
  disabledBtn: {
    backgroundColor: "#aaa",
  },
  pizzaToggle: {
    alignSelf: "flex-start", // 🍕 왼쪽 정렬
    marginTop: 10,
    marginLeft: 6, // 살짝 들여쓰기 (선택)
  },

  explanationBox: {
    marginTop: 14,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 12,
  },
  resultText: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  explanation: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
