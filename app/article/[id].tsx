import { useState } from "react";
import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import TabBar from "../../src/components/TabBar";
import ArticleTab from "../../src/components/ArticleTab";
import SummaryTab from "../../src/components/SummaryTab";
import KeywordTab from "../../src/components/KeywordTab";
import QuizTab from "../../src/components/QuizTab";

// 데이터 저장소에서 article/quiz 불러오기
import { getArticleById, getQuizById } from "../../src/data/article";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState("기사");

  // article.ts에서 ID 기반으로 기사와 퀴즈 불러오기
  const article = getArticleById(id);
  const quizList = getQuizById(id);

  // article 없으면 fallback
  if (!article) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>기사를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  // 퀴즈 상태
  const [selected, setSelected] = useState({});
  const [isGraded, setIsGraded] = useState(
    new Array(quizList.length).fill(false)
  );
  const [isOpen, setIsOpen] = useState({});

  const handleSelect = (q, o) =>
    setSelected((prev) => ({ ...prev, [q]: o }));

  const handleGrade = (qIndex) => {
    setIsGraded((prev) => {
      const updated = [...prev];
      updated[qIndex] = true;
      return updated;
    });
    setIsOpen((prev) => ({ ...prev, [qIndex]: true }));
  };

  const toggleOpen = (qIndex) =>
    setIsOpen((prev) => ({ ...prev, [qIndex]: !prev[qIndex] }));

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        backgroundColor: "transparent",
      }}
    >
      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        goHome={() => router.push("/")}
      />

      {/* tab에 데이터 전달 방식 그대로 유지 */}
      {activeTab === "기사" && (
        <ArticleTab
          article={article}
          onMoveToQuiz={() => setActiveTab("퀴즈")}
        />
      )}

      {activeTab === "요약" && (
        <SummaryTab summary={article.summary} />
      )}

      {activeTab === "키워드" && (
        <KeywordTab keywords={article.keywords} />
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
