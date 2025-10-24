import { useParams, useNavigate } from "react-router-dom";

export default function Article_detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "AI & 데이터 서밋 2025",
      content:
        "'AI & 데이터 서밋 2025'에서는 데이터 기반 AI 전략, 인프라 최적화, 애플리케이션 혁신 등 AI의 비즈니스 전반 적용 방안이 공유되었습니다.",
      date: "10월 13일 업데이트",
    },
    {
      id: 2,
      title: "싸피 14기 데이터반 ‘한입 기사’ 프로젝트 대박 조짐 보여",
      content:
        "대전 4반의 우수한 싸피생들이 진행 중인 한입기사 프로젝트가 성황리에 성공을 거둘 것으로 예측된다는 사실을 정량적, 정성적으로 분석함.",
      date: "10월 13일 업데이트",
    },
  ];

  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <h2>존재하지 않는 기사입니다 😢</h2>
      </div>
    );
  }

  return (
    // ✅ 전체 컨테이너를 세로(column) 방향으로 정렬해서
    //    카드 → 버튼 순으로 쌓이게 함
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F7F3EA",
        display: "flex",
        flexDirection: "column", // ✅ 세로 배치
        alignItems: "center", // ✅ 중앙 정렬
        padding: "60px 16px",
      }}
    >
      {/* 🟩 카드 영역 */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "600px",
          padding: "32px",
          marginBottom: "24px", // ✅ 버튼과의 간격
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          {article.title}
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#777",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          {article.date}
        </p>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.7",
            color: "#333",
            whiteSpace: "pre-line",
          }}
        >
          {article.content}
        </p>

        {/* 돌아가기 버튼은 카드 안쪽 유지 */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => window.history.back()}
            style={{
              marginTop: "32px",
              background: "#fff",
              border: "1px solid #ccc",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ← 돌아가기
          </button>
        </div>
      </div>

      {/* ✅ 문제 풀러가기 버튼: 카드 바깥, 중앙정렬 상태로 아래쪽 배치 */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => navigate(`/quiz/${id}`)}
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: "10px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          🧠 문제 풀러가기
        </button>
      </div>
    </div>
  );
}
