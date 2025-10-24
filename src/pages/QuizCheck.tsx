import { useLocation, useParams } from "react-router-dom";

export default function QuizCheck() {
  const { id } = useParams();
  const location = useLocation();
  const { selectedAnswers, quizList } = location.state || {};

  if (!quizList) return <p>문제 데이터가 없습니다.</p>;

  const correctCount = quizList.filter(
    (q, i) => selectedAnswers[i] === q.answer
  ).length;

  return (
    <div
      style={{
        background: "#F7F3EA",
        minHeight: "100vh",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "22px", marginBottom: "24px" }}>
        기사 {id} 퀴즈 결과
      </h1>

      {quizList.map((quiz, qIndex) => {
        const userAnswer = selectedAnswers[qIndex];
        const isCorrect = userAnswer === quiz.answer;

        return (
          <>
            <div
              key={qIndex}
              style={{
                width: "95%",
                maxWidth: "420px",
                background: "white",
                borderRadius: "14px",
                padding: "20px",
                paddingTop: "10px",
                marginBottom: "0px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: "20px"}}>
                {quiz.question}
              </h3>

              {quiz.options.map((opt, oIndex) => {
                const isUser = oIndex === userAnswer;
                const isAnswer = oIndex === quiz.answer;

                let bg = "#fff";
                if (isUser && isCorrect) bg = "#DFF5CC";
                else if (isUser && !isCorrect) bg = "#FDDCDC";
                else if (isAnswer && !isUser) bg = "#EAF8E0";

                return (
                  <div
                    key={oIndex}
                    style={{
                      background: bg,
                      borderRadius: "8px",
                      padding: "8px 12px",
                      marginBottom: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {opt}
                    {isAnswer && <span style={{ color: "green" }}>✔</span>}
                    {isUser && !isCorrect && (
                      <span style={{ color: "red" }}>✖</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ✅ 정답/오답 문구 + 해설 (가운데 정렬, 배경 없음) */}
            <div
              style={{
                marginTop: "30px",
                textAlign: "center",
                background: "none",
                fontSize: "15px",
                lineHeight: "1.6",
              }}
            >
              <strong
                style={{
                  fontSize: "17px",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {isCorrect ? "🎉 정답입니다!" : "❌ 오답입니다!"}
              </strong>

              <p
                style={{
                  fontSize: "14px",
                  color: "#444",
                  marginTop: "4px",
                  marginBottom: "60px",
                }}
              >
                문제 해설 변수처리 되어 있음 {quiz.explanation}
              </p>
            </div>
          </>
        );
      })}

      <div
        style={{
          background: "#fff",
          padding: "14px 20px",
          borderRadius: "10px",
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          fontWeight: "600",
        }}
      >
        총 {quizList.length}문제 중 {correctCount}문제 정답 🎯
      </div>
    </div>
  );
}
