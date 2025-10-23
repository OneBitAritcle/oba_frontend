import { useParams } from "react-router-dom";

export default function SummaryPage() {
  const { id } = useParams();

  // 임시 요약/키워드 데이터
  const summaryData = {
    1: {
      summary: `AI & 데이터 서밋 2025에서는 AI의 도입과 데이터 전략의 중요성이 강조되었으며, 
      IDC는 향후 3년간 AI 지출이 국내 디지털 기술 지출보다 1.6배 빠르게 증가할 것이라고 전망했다. 
      기업들은 AI를 단순한 도구로 보지 않고 핵심 운영과 전략에 내재화하고 있으며, 
      AI의 효과를 체감하기 위해서는 데이터 관리와 인프라 혁신이 필수적이다.`,
      keywords: [
        {
          title: "AI 내재화",
          points: [
            { subtitle: "개념 요약", text: "조직의 핵심 운영 및 전략에 AI 기술을 통합하는 것." },
            { subtitle: "IT/AI 산업 내 의미", text: "AI를 전략적 자산으로 활용해 경쟁력 향상." },
            { subtitle: "면접 활용 포인트", text: "AI 내재화를 본인의 경험과 연결해 설명하기." },
          ],
        },
      ],
    },
    2: {
      summary: `백엔드/데이터팀 최고.`,
      keywords: [
        {
          title: "한입기사 팀 최고",
          points: [
            { subtitle: "개념 요약", text: "조직의 핵심 운영 및 전략에 AI 기술을 통합하는 것." },
            { subtitle: "IT/AI 산업 내 의미", text: "AI를 전략적 자산으로 활용해 경쟁력 향상." },
            { subtitle: "면접 활용 포인트", text: "AI 내재화를 본인의 경험과 연결해 설명하기." },
          ],
        },
      ],
    },
  };

  const data = summaryData[Number(id) as keyof typeof summaryData];

  if (!data)
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <h2>요약 정보가 없습니다 😢</h2>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F7F3EA",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          padding: "24px",
        }}
      >
        <h2 style={{ fontSize: "18px", borderBottom: "2px solid #000", paddingBottom: "4px" }}>
          요약
        </h2>
        <p style={{ lineHeight: "1.6", marginTop: "10px" }}>{data.summary}</p>

        <h2
          style={{
            fontSize: "18px",
            borderBottom: "2px solid #000",
            marginTop: "30px",
            paddingBottom: "4px",
          }}
        >
          키워드
        </h2>

        {data.keywords.map((kw, idx) => (
          <div key={idx} style={{ marginTop: "16px" }}>
            <p style={{ fontWeight: "700", fontSize: "16px" }}>“{kw.title}”</p>
            <ul style={{ marginTop: "8px", lineHeight: "1.6" }}>
              {kw.points.map((p, i) => (
                <li key={i}>
                  <strong>{p.subtitle}</strong>
                  <br />
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
