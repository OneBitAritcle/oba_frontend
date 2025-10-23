import quizKnight from "../assets/icons/horse.png"; // ✅ 이미지 경로 맞게 수정

export default function QuizHome() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#EDE8DC", // ✅ 전체 배경색
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <img
        src={quizKnight}
        alt="Quiz Knight"
        style={{
          width: "140px",
          height: "140px",
          marginBottom: "20px",
          objectFit: "contain",
        }}
      />

      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>퀴즈 기록</h1>
      <p style={{ fontSize: "15px", color: "#555", maxWidth: "80%" }}>
        내가 푼 퀴즈와 틀린 문제들을 한눈에 확인해보세요.
      </p>
    </div>
  );
}
