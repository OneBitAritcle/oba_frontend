import { useNavigate } from "react-router-dom";


export default function article_main() {
  const navigate = useNavigate();
  const articles = [
    {
      id: 1,
      title: "AI & 데이터 서밋 2025",
      content:
        "'AI & 데이터 서밋 2025'에서는 데이터 기반 AI 전략, 인프라 최적화, 애플리케이션 혁신 등 AI의 비즈니스 전반 적용 방안이 공유되었습니다.",
      date: "10월 13일 업데이트",
      tags: ["데이터", "AI", "기술 업계 동향"],
    },
    {
      id: 2,
      title: "싸피 14기 데이터반 ‘한입 기사’ 프로젝트 대박 조짐 보여",
      content:
        "대전 4반의 우수한 싸피생들이 진행 중인 한입기사 프로젝트가 성황리에 성공을 거둘 것으로 예측된다는 사실을 정량적, 정성적으로 분석함.",
      date: "10월 13일 업데이트",
      tags: ["데이터", "AI"],
    },
    {
      id: 3,
      title: "기사 3",
      content:
        "내용3",
      tags: ["태그1", "태그2"],
    },
    {
      id: 4,
      title: "기사 4",
      content:
        "내용 4",
      tags: ["태그1", "태그2"],
    },
    {
      id: 5,
      title: "기사 5",
      content:
        "내용 5",
      tags: ["태그1", "태그2"],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F7F3EA",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>오늘의 기사 요약</h1>

      {articles.map((article) => (
        <div
          key={article.id}
          style={{
            width: "90%",
            maxWidth: "400px",
            marginBottom: "50px",
          }}
        >
          {/* 🟫 카드 안쪽 (제목 + 내용만, 클릭 시 이동) */}
          <div
            onClick={() => navigate(`/article_detail/${article.id}`)} // ✅ 상세 페이지 이동
            style={{
              backgroundColor: "#fff",
              borderRadius: "14px",
              padding: "16px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
              cursor: "pointer",            // ✅ 마우스 커서 변경
              transition: "transform 0.1s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            <h2 style={{ marginBottom: "8px", fontSize: "18px" }}>{article.title}</h2>
            <p
              style={{
                fontSize: "14px",
                color: "#333",
                marginBottom: "14px",
                lineHeight: "1.5",
              }}
            >
              {article.content}
            </p>
          </div>

          {/* 카드 밖 (날짜 + 퀴즈 버튼 + 태그) */}
          <div
            style={{
              marginTop: "8px",
              marginLeft: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "95%",
            }}
          >
            {/* 날짜 */}
            <p style={{ fontSize: "12px", color: "#777", margin: 0 }}>{article.date}</p>

            {/* 퀴즈 풀러가기 버튼 */}
            <button
              onClick={() => navigate(`/quiz/${article.id}`)}
              style={{
                fontSize: "12px",
                color: "#555",
                background: "none",
                border: "none",
                textDecoration: "underline",
                cursor: "pointer",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
            >
              퀴즈 풀러가기
            </button>
          </div>

          {/* 태그 */}
          <div
            style={{
              marginTop: "6px",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            {article.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "12px",
                  background: "#f1f1f1",
                  padding: "5px 10px",
                  borderRadius: "8px",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
          {/* 요약 키워드 */}
            <button
              onClick={() => console.log("키워드 페이지 이동 예정")}
              style={{
                fontSize: "12px",
                marginTop: "8px",
                color: "#555",
                background: "#f1f1f1",
                border: "none",
                flexWrap: "wrap",
                cursor: "pointer",
                padding: "5px 10px"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
            >
              {/* 🖼 왼쪽 이미지 */}
              <img
                src="src\assets\emoji\keyword (1).png"   // ✅ 이미지 경로 직접 넣거나 import 방식으로
                alt="keyword"
                style={{ width: "12px", height: "12px",
                  paddingRight: "4px"
                }}
              />
              요약 & 키워드 보기
            </button>
        </div>
      ))}
    </div>
  );
}
