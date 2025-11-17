import { useState } from "react";
import { View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import TabBar from "./components/TabBar";
import ArticleTab from "./components/ArticleTab";
import SummaryTab from "./components/SummaryTab";
import KeywordTab from "./components/KeywordTab";
import QuizTab from "./components/QuizTab";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState("기사");

  // dummy article
  const dummyArticle = {
    id,
    category: "AI / 데이터",
    title: "AI & 데이터 서밋 2025",
    date: "2025.10.20",
    source: "한입경제",
    summary: "AI 기술의 확산과 데이터 기반 혁신이 기업 경쟁력을 좌우한다는 분석.",
    keywords: [
      { word: "AI", desc: "인공지능 기술 전반" },
      { word: "데이터", desc: "데이터 기반 의사결정" },
      { word: "산업혁신", desc: "AI 활용 산업 혁신" },
    ],
    content: `AI & 데이터 서밋 2025에서는 AI 산업 확산과 데이터 활용 전략이 논의되었습니다.`,
  };

  // dummy quiz
  const quizList = [
    {
      question: "Q1. ‘AI & 데이터 서밋 2025’의 핵심 의제는 무엇인가?",
      options: [
        "AI·데이터 기반 전략",
        "의료 기술",
        "우주 탐사",
        "패션 산업"
      ],
      answer: 0,
      explanation: "서밋의 주요 주제는 AI 산업 확산과 데이터 전략입니다."
    },

    {
      question: "Q2. 기사에서 언급된 ‘데이터 기반 혁신’의 의미로 적절한 것은?",
      options: [
        "개인의 감에 의존한 의사결정",
        "데이터 분석을 통한 전략 수립",
        "랜덤으로 정책 선택",
        "감성 기반 마케팅"
      ],
      answer: 1,
      explanation: "데이터 기반 의사결정은 데이터를 근거로 전략을 결정하는 것을 의미합니다."
    },

    {
      question: "Q3. 기사 속 기업들이 경쟁력을 갖추기 위해 집중하고 있는 분야는?",
      options: [
        "엔터테인먼트",
        "AI 기술 및 데이터 활용",
        "음식 배달 서비스",
        "섬유 기술"
      ],
      answer: 1,
      explanation:
        "기업들이 집중하는 핵심은 AI 기술과 데이터 활용 역량을 강화하는 것입니다."
    },

    {
      question: "Q4. 서밋과 직접적으로 관련이 없는 주제는 무엇인가?",
      options: [
        "AI 확산",
        "데이터 인프라 혁신",
        "산업별 AI 활용 전략",
        "해양 환경 보호"
      ],
      answer: 3,
      explanation: "해양 환경 보호는 기사 내용과 관련이 없습니다."
    },

    {
      question: "Q5. 기사에서 언급된 ‘산업 혁신’과 가장 연관 있는 키워드는?",
      options: [
        "AI",
        "농업",
        "레저",
        "해외 관광"
      ],
      answer: 0,
      explanation: "산업 혁신은 AI·데이터 기술과 밀접하게 연결됩니다."
    },
  ];


  // quiz state
  const [selected, setSelected] = useState({});
  const [isGraded, setIsGraded] = useState({});
  const [isOpen, setIsOpen] = useState({});

  const handleSelect = (q, o) => setSelected((p) => ({ ...p, [q]: o }));
  const handleGrade = (q) =>
    setIsGraded((p) => ({ ...p, [q]: true })) ||
    setIsOpen((p) => ({ ...p, [q]: true }));
  const toggleOpen = (q) =>
    setIsOpen((p) => ({ ...p, [q]: !p[q] }));

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,           // Safe area 확보
        backgroundColor: "transparent",
      }}
    >
      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        goHome={() => router.push("/")}
      />

      {activeTab === "기사" && <ArticleTab article={dummyArticle} />}
      {activeTab === "요약" && <SummaryTab summary={dummyArticle.summary} />}
      {activeTab === "키워드" && <KeywordTab keywords={dummyArticle.keywords} />}
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
