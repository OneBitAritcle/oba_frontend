import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import TabBar from "./components/TabBar";
import ArticleTab from "./components/ArticleTab";
import SummaryTab from "./components/SummaryTab";
import KeywordTab from "./components/KeywordTab";
import QuizTab from "./components/QuizTab";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // /article/[id]

  const [activeTab, setActiveTab] = useState("기사");

  /** ✅ 타입 명시 (IMPORTANT) */
  const [article, setArticle] = useState<any | null>(null);
  const [quizList, setQuizList] = useState<any[]>([]);

  const [selected, setSelected] = useState<{ [key: number]: number }>({});
  const [isGraded, setIsGraded] = useState<boolean[]>([]);
  const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});

  // 🚀 API 연동 (Spring → FastAPI → MongoDB)
  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await fetch(`http://localhost:8081/article/${id}`);
        const data = await res.json();

        setArticle(data);

        /** 퀴즈 리스트 세팅 */
        setQuizList(data.quizzes || []);

        /** 채점 여부 배열 생성 */
        setIsGraded(new Array(data.quizzes.length).fill(false));

        /** isOpen 초기값 생성 */
        const openState: { [key: number]: boolean } = {};
        data.quizzes.forEach((_: any, idx: number) => {
          openState[idx] = false;
        });
        setIsOpen(openState);

      } catch (err) {
        console.error("❌ Article API Error:", err);
      }
    };

    loadArticle();
  }, [id]);


  /** 🔥 선택 핸들러 */
  const handleSelect = (qIndex: number, option: number) => {
    setSelected((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  /** 🔥 채점 핸들러 */
  const handleGrade = (qIndex: number) => {
    setIsGraded((prev) => {
      const copy = [...prev];
      copy[qIndex] = true;
      return copy;
    });

    // 정답 확인 창 열기
    setIsOpen((prev) => ({
      ...prev,
      [qIndex]: true,
    }));
  };

  /** 🔥 정답창 열고 닫기 */
  const toggleOpen = (qIndex: number) => {
    setIsOpen((prev) => ({
      ...prev,
      [qIndex]: !prev[qIndex],
    }));
  };

  // 🚨 API 로딩 중
  if (!article) {
    return (
      <View style={{ flex: 1, paddingTop: 50 }}>
        <Text style={{ textAlign: "center" }}>Loading...</Text>
      </View>
    );
  }

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

      {activeTab === "기사" && <ArticleTab article={article} />}
      {activeTab === "요약" && <SummaryTab summary={article.summary} />}
      {activeTab === "키워드" && (
        <KeywordTab keywords={article.keywords || []} />
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
