import { useState } from "react";
import { View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

// 컴포넌트(탭) import
import TabBar from "./components/TabBar";
import ArticleTab from "./components/ArticleTab";
import SummaryTab from "./components/SummaryTab";
import KeywordTab from "./components/KeywordTab";
import QuizTab from "./components/QuizTab";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // 🔥 탭 상태
  const [activeTab, setActiveTab] = useState("기사");

  // -----------------------------------------------------
  // 🔥 기사 데이터 (API 연결 전까지 dummy)
  // -----------------------------------------------------
  const dummyArticle = {
    id,
    category: "AI / 데이터",
    title: "AI & 데이터 서밋 2025, 기업의 새로운 전환점",
    date: "2025.10.20",
    source: "한입경제",
    summary:
      "AI 기술의 확산과 데이터 기반 혁신이 기업 경쟁력을 좌우한다는 분석.",
    keywords: ["AI", "데이터", "산업혁신", "비즈니스"],
    content: `AI & 데이터 서밋 2025에서는 AI의 산업적 확산과 데이터 활용 전략이 주요 의제로 다뤄졌습니다. 
기업들은 AI를 통한 자동화, 맞춤형 서비스, 데이터 기반 의사결정 강화에 주목하고 있습니다.`,
  };

  // -----------------------------------------------------
  // 🔥 퀴즈 데이터
  // -----------------------------------------------------
  const quizList = [
    {
      question: "Q1. 'AI & 데이터 서밋 2025'의 주요 의제는?",
      options: [
        "AI 도입 전략과 데이터 활용",
        "패션 산업 트렌드",
        "해양 생태계 보호",
        "스포츠 과학 기술",
      ],
      answer: 0,
      explanation:
        "AI & 데이터 서밋 2025에서는 AI와 데이터 전략, 인프라 혁신 등이 논의되었습니다.",
    },
    {
      question: "Q2. 한입기사의 주요 기능은?",
      options: ["뉴스 요약 제공", "음악 재생", "지도 탐색", "게임 제공"],
      answer: 0,
      explanation:
        "한입기사는 사용자가 빠르게 뉴스를 요약해 볼 수 있도록 하는 서비스입니다.",
    },
  ];

  // -----------------------------------------------------
  // 🔥 퀴즈 상태
  // -----------------------------------------------------
  const [selected, setSelected] = useState({});
  const [isGraded, setIsGraded] = useState({});
  const [isOpen, setIsOpen] = useState({});

  const handleSelect = (qIndex, oIndex) => {
    setSelected((prev) => ({ ...prev, [qIndex]: oIndex }));
  };

  const handleGrade = (qIndex) => {
    setIsGraded((prev) => ({ ...prev, [qIndex]: true }));
    setIsOpen((prev) => ({ ...prev, [qIndex]: true }));
  };

  const toggleOpen = (qIndex) => {
    setIsOpen((prev) => ({ ...prev, [qIndex]: !prev[qIndex] }));
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 🔥 상단 탭바 */}
      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        goHome={() => router.push("/")}
      />

      {/* -------------------------------------------------- */}
      {/* ✔ 탭별 UI 렌더링 */}
      {/* -------------------------------------------------- */}

      {activeTab === "기사" && <ArticleTab article={dummyArticle} />}

      {activeTab === "요약" && (
        <SummaryTab summary={dummyArticle.summary} />
      )}

      {activeTab === "키워드" && (
        <KeywordTab keywords={dummyArticle.keywords} />
      )}

      {activeTab === "퀴즈" && (
        <QuizTab
          quizList={quizList}
          selected={selected}
          isGraded={isGraded}
          isOpen={isOpen}
          handleSelect={handleSelect}
          handleGrade={handleGrade}
          toggleOpen={toggleOpen}
        />
      )}
    </View>
  );
}
