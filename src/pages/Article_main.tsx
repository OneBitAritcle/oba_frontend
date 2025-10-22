export default function Article_main() {
  // 임시 기사 데이터 (나중에 백엔드 연결하면 이 부분에서 받아올 예정)
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
      title: "각 블럭별 이동 방식 개편",
      content:
        "기사 탭을 누르면 상세 보기, 해시태그를 누르면 해당 주제의 기사 모음으로 이동하도록 개선되었습니다.",
      date: "10월 13일 업데이트",
      tags: ["UX", "기능 업데이트"],
    },
        {
      id: 4,
      title: "싸피 14기 데이터반 ‘한입 기사’ 프로젝트 대박 조짐 보여",
      content:
        "대전 4반의 우수한 싸피생들이 진행 중인 한입기사 프로젝트가 성황리에 성공을 거둘 것으로 예측된다는 사실을 정량적, 정성적으로 분석함.",
      date: "10월 13일 업데이트",
      tags: ["데이터", "AI"],
    },
    {
      id: 5,
      title: "각 블럭별 이동 방식 개편",
      content:
        "기사 탭을 누르면 상세 보기, 해시태그를 누르면 해당 주제의 기사 모음으로 이동하도록 개선되었습니다.",
      date: "10월 13일 업데이트",
      tags: ["UX", "기능 업데이트"],
    }
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
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>오늘의 기사 요약</h1>

      {/* 카드들을 map으로 반복 출력 */}
      {articles.map((article) => (
        <div
          key={article.id}
          style={{
            backgroundColor: "#fff",
            width: "90%",
            maxWidth: "340px",
            borderRadius: "14px",
            padding: "16px",
            marginBottom: "16px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "8px", fontSize: "18px" }}>{article.title}</h2>
          <p
            style={{
              fontSize: "14px",
              color: "#333",
              marginBottom: "12px",
              lineHeight: "1.4",
            }}
          >
            {article.content}
          </p>
          <p style={{ fontSize: "12px", color: "#777" }}>{article.date}</p>

          <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {article.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "12px",
                  background: "#f1f1f1",
                  padding: "4px 8px",
                  borderRadius: "8px",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
