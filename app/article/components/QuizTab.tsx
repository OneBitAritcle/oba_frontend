// import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

// export default function QuizTab({
//   quizList,  
//   selected,
//   isGraded,
//   isOpen,
//   handleSelect,
//   handleGrade,
//   toggleOpen,
// }) {
//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
//     >
//       <Text style={styles.header}>Quiz</Text>

//       {quizList.map((quiz, qIndex) => {
//         const userAnswer = selected[qIndex];
//         const graded = isGraded[qIndex];
//         const open = isOpen[qIndex];
//         const isCorrect = userAnswer === quiz.answer;

//         return (
//           <View key={qIndex} style={styles.quizBlock}>
//             {/* 질문 */}
//             {/*<Text style={styles.question}>{quiz.question}</Text>*/}
//             <Text style={styles.question}>{`Q${qIndex + 1}. ${quiz.question}`}</Text>

//             {/* 선택지 */}
//             {quiz.options.map((opt, oIndex) => {
//               const selectedOption = userAnswer === oIndex;

//               return (
//                 <TouchableOpacity
//                   key={oIndex}
//                   disabled={graded}
//                   onPress={() => handleSelect(qIndex, oIndex)}
//                   style={[
//                     styles.option,
//                     selectedOption && styles.selected,
//                     graded &&
//                       oIndex === quiz.answer && { 
//                         backgroundColor: "#DFF5CC",
//                         borderColor: "#8BC34A",                       },
//                     graded &&
//                       selectedOption &&
//                       oIndex !== quiz.answer && { 
//                         backgroundColor: "#FDDCDC",
//                         borderColor: "#E57373",
//                       },
//                   ]}
//                 >
//                   <Text style={styles.optionText}>{opt}</Text>
//                 </TouchableOpacity>
//               );
//             })}

//             {/* 채점 버튼 */}
//             <TouchableOpacity
//               onPress={() => handleGrade(qIndex)}
//               disabled={graded || selected[qIndex] === undefined}
//               style={[
//                 styles.gradeBtn,
//                 graded && styles.disabledBtn,
//                 selected[qIndex] === undefined && styles.disabledBtn,
//               ]}
//             >
//               <Text style={styles.gradeText}>
//                 {graded ? "채점 완료" : "채점하기"}
//               </Text>
//             </TouchableOpacity>

//             {/* 해설 */}
//             {graded && (
//               <View style={styles.explanationWrapper}>
//                 <TouchableOpacity onPress={() => toggleOpen(qIndex)}>
//                   <Image
//                     source={
//                       open
//                         ? require("../../../assets/icons/toggle_1.png")
//                         : require("../../../assets/icons/toggle_2.png")
//                     }
//                     style={styles.pizzaIcon}
//                   />
//                 </TouchableOpacity>

//                 {open && (
//                   <View style={styles.explanationBox}>
//                     <Text
//                       style={[
//                         styles.resultText,
//                         { color: isCorrect ? "#2E7D32" : "#C62828" },
//                       ]}
//                     >
//                       {isCorrect ? "🎉 정답입니다!" : "❌ 오답입니다!"}
//                     </Text>

//                     <Text style={styles.explanation}>
//                       {quiz.explanation}
//                     </Text>
//                   </View>
//                 )}
//               </View>
//             )}
//           </View>
//         );
//       })}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 }, // 사용 X (ScrollView에서 padding 처리)
//   header: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 20 },

//   quizBlock: {
//     backgroundColor: "white",
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 24,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//   },

//   question: { fontSize: 16, fontWeight: "600", marginBottom: 14 },

//   option: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     marginBottom: 8,
//     backgroundColor: "#fff",
//   },

//   optionText: { fontSize: 14, color: "#333" },

//   selected: {
//     borderColor: "#ff9f00",
//     backgroundColor: "#fff5e0",
//   },

//   gradeBtn: {
//     marginTop: 10,
//     backgroundColor: "#222",
//     paddingVertical: 10,
//     borderRadius: 8,
//   },

//   gradeText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//   },

//   disabledBtn: { backgroundColor: "#aaa" },

//   explanationWrapper: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginTop: 12,
//   },

//   pizzaIcon: {
//     width: 36,
//     height: 36,
//     marginRight: 10,
//   },

//   explanationBox: {
//     flex: 1,
//     backgroundColor: "#daedffff",
//     borderRadius: 10,
//     padding: 12,
//   },

//   resultText: { fontWeight: "600", fontSize: 15, marginBottom: 4 },

//   explanation: { fontSize: 14, color: "#333", lineHeight: 20 },
// });



import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";

export default function QuizTab({
  quizList,
  selected,
  isGraded,
  isOpen,
  handleSelect,
  handleGrade,
  toggleOpen,
}) {
  // 결과 모달 표시 여부 상태
  const [showResult, setShowResult] = useState(false);

  // 전체 문제 수와 채점된 문제 수 계산
  const totalCount = quizList.length;
  // isGraded 배열 중 true인 것의 개수
  const gradedCount = isGraded.filter((graded) => graded === true).length;

  // 맞은 개수 계산 로직
  const correctCount = quizList.reduce((acc, quiz, index) => {
    const userAnswer = selected[index];
    return userAnswer === quiz.answer ? acc + 1 : acc;
  }, 0);

  // [Effect] 모든 문제가 채점되었을 때 모달 띄우기
  useEffect(() => {
    if (totalCount > 0 && gradedCount === totalCount) {
      setShowResult(true);
    }
  }, [gradedCount, totalCount]);

  // 점수에 따른 멘트와 이모지 결정 함수
  const getResultContent = () => {
    if (correctCount === totalCount) {
      return {
        emoji: "🏆",
        title: "완벽해요!",
        desc: "모든 문제를 맞히셨네요!\n정말 대단한 실력입니다 🎉",
      };
    } else if (correctCount >= totalCount / 2) {
      return {
        emoji: "👏",
        title: "잘했어요!",
        desc: `${totalCount}문제 중 ${correctCount}개를 맞혔어요.\n조금만 더 하면 만점이겠는데요? 🔥`,
      };
    } else {
      return {
        emoji: "📚",
        title: "아쉬워요",
        desc: `${totalCount}문제 중 ${correctCount}개를 맞혔어요.\n다음엔 더 잘할 수 있을 거예요! 💪`,
      };
    }
  };

  const resultContent = getResultContent();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
      >
        <Text style={styles.header}>Quiz</Text>

        {quizList.map((quiz, qIndex) => {
          const userAnswer = selected[qIndex];
          const graded = isGraded[qIndex];
          const open = isOpen[qIndex];
          const isCorrect = userAnswer === quiz.answer;

          return (
            <View key={qIndex} style={styles.quizBlock}>
              {/* 질문 */}
              <Text style={styles.question}>{`Q${qIndex + 1}. ${
                quiz.question
              }`}</Text>

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
                        oIndex === quiz.answer && {
                          backgroundColor: "#DFF5CC",
                          borderColor: "#8BC34A",
                        },
                      graded &&
                        selectedOption &&
                        oIndex !== quiz.answer && {
                          backgroundColor: "#FDDCDC",
                          borderColor: "#E57373",
                        },
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

                      <Text style={styles.explanation}>{quiz.explanation}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* 결과 축하 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showResult}
        onRequestClose={() => setShowResult(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>{resultContent.emoji}</Text>
            <Text style={styles.modalTitle}>{resultContent.title}</Text>
            <Text style={styles.modalScore}>
              총 <Text style={{ color: "#ff9f00" }}>{correctCount}</Text>개 / {totalCount}개
            </Text>
            <Text style={styles.modalDesc}>{resultContent.desc}</Text>

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowResult(false)}
            >
              <Text style={styles.modalCloseText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... 기존 스타일 유지 ...
  container: { padding: 20 },
  header: {
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
    elevation: 2, // 안드로이드 그림자 추가
  },

  question: { fontSize: 16, fontWeight: "600", marginBottom: 14 },

  option: {
    padding: 12, // 터치 영역 조금 더 확보
    borderWidth: 1,
    borderColor: "#eee", // 기본 색상 조금 연하게
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
    paddingVertical: 12,
    borderRadius: 8,
  },

  gradeText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },

  disabledBtn: { backgroundColor: "#ccc" }, // 색상 약간 조정

  explanationWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
  },

  pizzaIcon: {
    width: 36,
    height: 36,
    marginRight: 10,
  },

  explanationBox: {
    flex: 1,
    backgroundColor: "#f0f8ff", // 조금 더 부드러운 하늘색
    borderRadius: 10,
    padding: 12,
  },

  resultText: { fontWeight: "600", fontSize: 15, marginBottom: 4 },

  explanation: { fontSize: 14, color: "#555", lineHeight: 20 },

  // --- 새로 추가된 모달 스타일 ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalScore: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#555",
  },
  modalDesc: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
    lineHeight: 22,
  },
  modalCloseBtn: {
    backgroundColor: "#ff9f00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  modalCloseText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});