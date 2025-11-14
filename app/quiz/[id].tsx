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
// → /quiz/[id] 라우트에서 id 값을 가져오기 위해 사용

export default function QuizPage() {
  // URL에서 전달된 id (예: /quiz/3 → id = "3")
  const { id } = useLocalSearchParams();

  // ---------------------------------------------
  // 🧩 더미 퀴즈 데이터
  // 실제 서비스에서는 API에서 반환되는 데이터에 해당함
  // ---------------------------------------------
  const quizList = [
    {
      question: "Q1. 'AI & 데이터 서밋 2025'의 주요 의제는?",
      options: [
        "AI 도입 전략과 데이터 활용",
        "패션 산업 트렌드",
        "해양 생태계 보호",
        "스포츠 과학 기술",
      ],
      answer: 0, // 정답 index
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

  // ---------------------------------------------
  // 🔹 문제별 상태 저장 로직
  // ---------------------------------------------

  // 사용자가 어떤 선택지를 골랐는지 저장
  // { 0: 2, 1: 1 } → 0번 문제에서 2번 선택, 1번 문제에서 1번 선택
  const [selected, setSelected] = useState<{ [key: number]: number | null }>({});

  // 문제별 채점 여부 저장
  // { 0: true, 1: false } → 첫 번째 문제는 채점됨
  const [isGraded, setIsGraded] = useState<{ [key: number]: boolean }>({});

  // 해설 박스 펼침 여부 저장
  // { 0: true, 1: false } → 0번 문제 해설 열림
  const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});


  // 사용자가 선택지를 고르는 함수
  const handleSelect = (qIndex: number, oIndex: number) => {
    setSelected((prev) => ({ ...prev, [qIndex]: oIndex }));
  };

  // 채점하기 버튼 눌렀을 때 실행
  const handleGrade = (qIndex: number) => {
    setIsGraded((prev) => ({ ...prev, [qIndex]: true }));
    setIsOpen((prev) => ({ ...prev, [qIndex]: true })); // 기본적으로 열림
  };

  // 해설 열기/닫기 토글
  const toggleOpen = (qIndex: number) => {
    setIsOpen((prev) => ({ ...prev, [qIndex]: !prev[qIndex] }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* 🧠 어떤 기사 퀴즈인지 상단 제목으로 표시 */}
      <Text style={styles.header}>🧠 기사 {id} 퀴즈</Text>

      {/* ---------------------------------------------------------
          🔶 문제 목록 렌더링
         --------------------------------------------------------- */}
      {quizList.map((quiz, qIndex) => {
        // 문제별 현재 상태
        const userAnswer = selected[qIndex];
        const graded = isGraded[qIndex];
        const open = isOpen[qIndex];
        const isCorrect = userAnswer === quiz.answer;

        return (
          <View key={qIndex} style={styles.quizBlock}>
            {/* 문제 내용 */}
            <Text style={styles.question}>{quiz.question}</Text>

            {/* 선택지 렌더링 */}
            {quiz.options.map((opt, oIndex) => {
              const selectedOption = userAnswer === oIndex;

              return (
                <TouchableOpacity
                  key={oIndex}
                  disabled={graded} // 채점 이후에는 선택 못함
                  onPress={() => handleSelect(qIndex, oIndex)}
                  style={[
                    styles.option,
                    selectedOption && styles.selected, // 내가 선택한 옵션

                    // 정답이면 연두색
                    graded && oIndex === quiz.answer && { backgroundColor: "#DFF5CC" },

                    // 오답 선택이면 빨간색
                    graded &&
                      selectedOption &&
                      oIndex !== quiz.answer && { backgroundColor: "#FDDCDC" },
                  ]}
                >
                  <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
              );
            })}

            {/* -----------------------------------------------------
                🔵 채점하기 버튼
                - 선택하기 전까지는 비활성
                - 채점이 끝난 문제는 버튼도 disabled
               ----------------------------------------------------- */}
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

            {/* -----------------------------------------------------
                📘 해설 표시 영역
             ----------------------------------------------------- */}
            {graded && (
              <View style={styles.explanationWrapper}>
                {/* 해설 열기/닫기 버튼 (토글 아이콘) */}
                <TouchableOpacity onPress={() => toggleOpen(qIndex)}>
                  <Image
                    source={
                      open
                        ? require("../../assets/icons/toggle_1.png") // 🔽 펼쳐진 상태
                        : require("../../assets/icons/toggle_2.png") // ▶️ 닫힌 상태
                    }
                    style={styles.pizzaIcon}
                  />
                </TouchableOpacity>

                {/* 해설 박스 (토글 상태에 따라 표시) */}
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

                    <Text style={styles.explanation}>{quiz.explanation}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}


// ------------------------------------------
// 📌 스타일 정의
// ------------------------------------------
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

  // 🍕 + 📦 해설 영역 전체 wrapper
  explanationWrapper: {
    flexDirection: "row", // 버튼 ⬅️➜ 박스 가로 배치
    alignItems: "flex-start",
    marginTop: 12,
  },

  // 펼침/닫힘 아이콘
  pizzaIcon: {
    width: 36,
    height: 36,
    marginRight: 10,
  },

  // 해설 박스
  explanationBox: {
    flex: 1,
    backgroundColor: "#daedffff",
    borderRadius: 10,
    padding: 12,
  },

  resultText: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 4,
  },

  explanation: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
