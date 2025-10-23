import { useParams } from "react-router-dom";
import { useState } from "react";
import checkIcon from "../assets/emoji/check.png";


export default function QuizPage() {
  const { id } = useParams();
  const articleId = Number(id) as keyof typeof quizData;

  // 임시 퀴즈 데이터 (각 기사별 5문제)
  const quizData = {
    1: [
      {
        question: "Q1. 'AI & 데이터 서밋 2025'에서 논의된 주요 주제가 아닌 것은?",
        options: [
          "AI 전략과 인프라 최적화",
          "금융 산업에서의 AI 도입 전략",
          "AI 기반의 법률 규제 강화",
          "AI 신뢰성과 관찰가능성",
        ],
        answer: 2,
      },
      {
        question: "Q2. IDC가 전망한 2027년까지의 AI 경제 효과는 얼마인가?",
        options: ["500억 달러", "1,000억 달러", "1,400억 달러", "2,000억 달러"],
        answer: 1,
      },
      {
        question: "Q3. AI 기술 도입의 주요 장애 요인은?",
        options: ["데이터 품질 부족", "하드웨어 성능 과잉", "AI 과잉 공급", "시장 불확실성 감소"],
        answer: 0,
      },
      {
        question: "Q4. AI 서밋 2025의 개최 목적은?",
        options: ["AI 비즈니스 적용 논의", "게임 산업 발전", "디자인 협업", "패션 산업 홍보"],
        answer: 0,
      },
      {
        question: "Q5. AI & 데이터 서밋 2025의 중심 키워드는?",
        options: ["혁신", "휴식", "감성", "예술"],
        answer: 0,
      },
    ],
    2: [
      {
        question: "Q1. ‘한입기사’ 프로젝트의 주요 목적은?",
        options: ["기사 요약 제공", "음악 스트리밍", "영상 추천", "게임 제작"],
        answer: 0,
      },
      {
        question: "Q2. 이 프로젝트를 진행한 팀은?",
        options: [
          "싸피 14기 대전 4반",
          "싸피 10기 서울 1반",
          "삼성전자 AI센터",
          "카카오 데이터팀",
        ],
        answer: 0,
      },
      {
        question: "Q3. 한입기사의 핵심 기능은?",
        options: ["뉴스 요약", "음성 인식", "이미지 생성", "날씨 분석"],
        answer: 0,
      },
      {
        question: "Q4. 한입기사의 타깃 유저층은?",
        options: ["취준생 및 직장인", "초등학생", "연예인", "운동선수"],
        answer: 0,
      },
      {
        question: "Q5. 프로젝트 명칭의 의미는?",
        options: ["한입 거리로 읽는 기사", "AI가 요리하는 기사", "짧은 광고 문구", "한 페이지 기사"],
        answer: 0,
      },
    ],
  };

  const [selected, setSelected] = useState<{ [key: number]: number | null }>({});

  const handleSelect = (qIndex: number, oIndex: number) => {
    setSelected((prev) => ({ ...prev, [qIndex]: oIndex }));
  };

  const quizList = quizData[articleId] || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F7F3EA",
        padding: "24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "22px", marginBottom: "8px" }}>
          기사 {id} 퀴즈
        </h1>

        {quizList.map((quiz, qIndex) => (
          <div
            key={qIndex}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <p
              style={{
                fontWeight: "600",
                fontSize: "16px",
                marginBottom: "14px",
              }}
            >
              {quiz.question}
            </p>

            {quiz.options.map((opt, oIndex) => {
              const isSelected = selected[qIndex] === oIndex;

              return (
                <button
                  key={oIndex}
                  onClick={() => handleSelect(qIndex, oIndex)}
                  style={{
                    display: "flex",                 // ✅ 글씨와 이미지 가로 정렬
                    justifyContent: "space-between", // ✅ 텍스트 왼쪽 / 이미지 오른쪽
                    alignItems: "center",
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "10px",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    background: "#fff",
                    cursor: "pointer",
                    fontWeight: isSelected ? "700" : "400", // ✅ 글씨 굵게
                  }}
                >
                  <span>{opt}</span>

                  {/* ✅ 오른쪽 체크 이미지 (선택된 보기일 때만 표시) */}
                  {isSelected && (
                    <img
                      src={checkIcon}
                      alt="check"
                      style={{ width: "18px", height: "18px" }}
                    />
                  )}
                </button>
              );
            })}

          </div>
        ))}
        {/* 채점하러가기 버튼 */}
        <button
          onClick={() => console.log("채점하러가기 버튼 클릭됨")}
          disabled={Object.keys(selected).length < quizList.length} // ✅ 조건 추가
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            borderRadius: "10px",
            border: "1px solid #ccccccff",
            background:
              Object.keys(selected).length < quizList.length ? "#eee" : "#eefff3ff", // 비활성화 시 회색
            cursor:
              Object.keys(selected).length < quizList.length ? "not-allowed" : "pointer",
            alignSelf: "center",
            fontSize: "15px",
            fontWeight: "600",
            color:
              Object.keys(selected).length < quizList.length ? "#999" : "#000",
          }}
        >
          채점하러가기
        </button>
      </div>
    </div>
  );
}
