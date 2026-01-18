// oba_fronted/app/article/components/QuizTab.tsx
import React, { useState, useEffect } from "react"
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, Modal } from "react-native"

export default function QuizTab({ quizList, selected, isGraded, isOpen, handleSelect, handleGrade, toggleOpen, myQuizResults }: any) {
  const safeQuizList = quizList || []
  const safeMyResults = myQuizResults || [] 
  const [showResult, setShowResult] = useState(false)

  const totalCount = safeQuizList.length
  const safeIsGraded = isGraded || []
  const gradedCount = safeIsGraded.filter((graded: any) => graded === true).length
  
  const getCorrectIndex = (quiz: any) => {
    return quiz.answerIndex !== undefined 
      ? Number(quiz.answerIndex) 
      : (parseInt(quiz.answer?.replace(/[^0-9]/g, "") || "0") - 1);
  }

  const correctCount = safeQuizList.reduce((acc: number, quiz: any, index: number) => {
    const userAnswer = selected[index]
    const correctAnswer = getCorrectIndex(quiz);
    return userAnswer === correctAnswer ? acc + 1 : acc
  }, 0)

  useEffect(() => {
    if (totalCount > 0 && gradedCount === totalCount) {
      setShowResult(true)
    }
  }, [gradedCount, totalCount])

  const resultContent = correctCount === totalCount
    ? { emoji: "🏆", title: "완벽해요!", desc: "모든 문제를 맞히셨네요!\n피자 한 판 드실 자격이 있습니다!! 🍕🎉" }
    : { emoji: "👏", title: "학습 완료!", desc: `${totalCount}문제 중 ${correctCount}개를 맞혔어요.\n오늘도 지식 한 조각 챙겨가세요! 🍕` };

  if (totalCount === 0) return <View style={styles.empty}><Text>등록된 퀴즈가 없습니다.</Text></View>

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
        <Text style={styles.header}>Quiz</Text>
        {safeQuizList.map((quiz: any, qIndex: number) => {
          const userAnswer = selected[qIndex]
          const graded = safeIsGraded[qIndex]
          const open = isOpen[qIndex]
          const correctAnswerIndex = getCorrectIndex(quiz);
          const isCorrect = userAnswer === correctAnswerIndex;
          const isPreviouslySolved = safeMyResults[qIndex] === true

          return (
            <View key={qIndex} style={[styles.quizBlock, (isPreviouslySolved || (graded && isCorrect)) && styles.solvedBlock]}>
              <Text style={styles.question}>{`Q${qIndex + 1}. ${quiz.question}`}</Text>

              {quiz.options.map((opt: string, oIndex: number) => {
                const isSelected = userAnswer === oIndex
                const isRightAnswer = oIndex === correctAnswerIndex
                
                // 채점 후 스타일 결정 로직
                let optionStyle: any = [styles.option];
                let textStyle: any = [styles.optionText];

                if (isSelected) optionStyle.push(styles.selected);

                if (graded || isPreviouslySolved) {
                  if (isRightAnswer) {
                    // 정답인 경우 (사용자 선택 여부와 상관없이 초록색 표시)
                    optionStyle.push(styles.correctOption);
                    textStyle.push(styles.correctText);
                  } else if (isSelected && !isRightAnswer) {
                    // 오답인데 사용자가 선택한 경우 (빨간색 표시)
                    optionStyle.push(styles.wrongOption);
                    textStyle.push(styles.wrongText);
                  }
                }

                return (
                  <TouchableOpacity
                    key={oIndex}
                    // ✅ 채점 완료되었거나 이전에 푼 문제면 클릭 불가
                    disabled={graded || isPreviouslySolved} 
                    onPress={() => handleSelect(qIndex, oIndex)}
                    style={optionStyle}
                  >
                    <View style={styles.optionContent}>
                      <Text style={textStyle}>{opt}</Text>
                      { (graded || isPreviouslySolved) && isRightAnswer && <Text style={styles.checkIcon}>✅</Text> }
                    </View>
                  </TouchableOpacity>
                )
              })}

              {!isPreviouslySolved && (
                <TouchableOpacity
                  onPress={() => handleGrade(qIndex)}
                  disabled={graded || selected[qIndex] === undefined}
                  style={[styles.gradeBtn, (graded || selected[qIndex] === undefined) && styles.disabledBtn]}
                >
                  <Text style={styles.gradeText}>{graded ? "채점 완료" : "채점하기"}</Text>
                </TouchableOpacity>
              )}

              {(graded || isPreviouslySolved) && (
                <View style={styles.explanationWrapper}>
                  <TouchableOpacity onPress={() => toggleOpen(qIndex)}>
                    <Image
                      source={open ? require("../../../assets/icons/toggle_1.png") : require("../../../assets/icons/toggle_2.png")}
                      style={styles.pizzaIcon}
                    />
                  </TouchableOpacity>
                  {open && (
                    <View style={styles.explanationBox}>
                      <Text style={[styles.resultText, { color: isCorrect || isPreviouslySolved ? "#2E7D32" : "#C62828" }]}>
                        {isCorrect || isPreviouslySolved ? "🎉 정답입니다!" : "❌ 오답입니다!"}
                      </Text>
                      <Text style={styles.explanation}>{quiz.explanation}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )
        })}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={showResult} onRequestClose={() => setShowResult(false)}>
        <View style={styles.modalOverlay}>
           <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>{resultContent.emoji}</Text>
            <Text style={styles.modalTitle}>{resultContent.title}</Text>
            <Text style={styles.modalDesc}>{resultContent.desc}</Text>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowResult(false)}>
              <Text style={styles.modalCloseText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
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
    elevation: 2,
  },
  solvedBlock: {
    borderColor: "#E8F5E9",
    borderWidth: 1,
  },
  question: { fontSize: 16, fontWeight: "600", marginBottom: 14 },
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  optionText: { fontSize: 14, color: "#333" },
  selected: {
    borderColor: "#ff9f00",
    backgroundColor: "#fff5e0",
  },
  // ✅ 정답 스타일
  correctOption: {
    backgroundColor: "#DFF5CC",
    borderColor: "#8BC34A",
  },
  correctText: {
    color: "#2E7D32",
    fontWeight: "700",
  },
  // ✅ 오답 스타일
  wrongOption: {
    backgroundColor: "#FDDCDC",
    borderColor: "#E57373",
  },
  wrongText: {
    color: "#C62828",
  },
  checkIcon: {
    fontSize: 14,
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
  disabledBtn: { backgroundColor: "#ccc" },
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
    backgroundColor: "#f0f8ff",
    borderRadius: 10,
    padding: 12,
  },
  resultText: { fontWeight: "600", fontSize: 15, marginBottom: 4 },
  explanation: { fontSize: 14, color: "#555", lineHeight: 20 },
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
  modalEmoji: { fontSize: 50, marginBottom: 10 },
  modalTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#333" },
  modalDesc: { fontSize: 15, textAlign: "center", color: "#666", marginBottom: 24, lineHeight: 22 },
  modalCloseBtn: { backgroundColor: "#ff9f00", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  modalCloseText: { color: "white", fontWeight: "bold", fontSize: 16 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})