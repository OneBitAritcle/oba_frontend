import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function QuizTab({
  quizList,
  selected,
  isGraded,
  isOpen,
  handleSelect,
  handleGrade,
  toggleOpen,
}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
    >
      <Text style={styles.header}>🧠 퀴즈</Text>

      {quizList.map((quiz, qIndex) => {
        const userAnswer = selected[qIndex];
        const graded = isGraded[qIndex];
        const open = isOpen[qIndex];
        const isCorrect = userAnswer === quiz.answer;

        return (
          <View key={qIndex} style={styles.quizBlock}>
            {/* 질문 */}
            <Text style={styles.question}>{quiz.question}</Text>

            {/* 선택지 */}
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

            {/* 채점 버튼 */}
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

            {/* 해설 */}
            {graded && (
              <View style={styles.explanationWrapper}>
                <TouchableOpacity onPress={() => toggleOpen(qIndex)}>
                  <Image
                    source={
                      open
                        ? require("../../../assets/icons/toggle_1.png")
                        : require("../../../assets/icons/toggle_2.png")
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
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 }, // 사용 X (ScrollView에서 padding 처리)
  header: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 20 },

  quizBlock: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  question: { fontSize: 16, fontWeight: "600", marginBottom: 14 },

  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },

  optionText: { fontSize: 14, color: "#333" },

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

  explanation: { fontSize: 14, color: "#333", lineHeight: 20 },
});
