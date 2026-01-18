// oba_fronted/app/article/[id].tsx
import { useState, useEffect } from "react";
import { View, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store"; 

import TabBar from "./components/TabBar";
import ArticleTab from "./components/ArticleTab";
import KeywordTab from "./components/KeywordTab";
import QuizTab from "./components/QuizTab";
import { apiClient } from "../../src/api/apiClient";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [activeTab, setActiveTab] = useState("기사");
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // 퀴즈 상태
  const [selected, setSelected] = useState<any>({});
  const [isGraded, setIsGraded] = useState<boolean[]>([]);
  const [isOpen, setIsOpen] = useState<any>({});
  const [myQuizResults, setMyQuizResults] = useState<boolean[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        const res = await apiClient.get(`/api/articles/${id}`);
        const data = res.data;
        
        // 데이터 파싱 방어 로직
        if (data.gpt_result && typeof data.gpt_result === 'string') {
            try { data.gpt_result = JSON.parse(data.gpt_result); } catch(e) {}
        }
        if (data.gptResult && typeof data.gptResult === 'string') {
            try { data.gptResult = JSON.parse(data.gptResult); } catch(e) {}
        }

        setArticle(data);
        
        // 퀴즈 데이터 초기화
        const gptData = data.gpt_result || data.gptResult || data.gptResults || data.GPTResult || {};
        const quizzes = data.quizzes || gptData.quizzes || [];
        
        if (quizzes.length > 0) {
          // 기존에 푼 기록이 있으면 불러오기, 없으면 false로 초기화
          if (data.myQuizResults && data.myQuizResults.length > 0) {
             setMyQuizResults(data.myQuizResults);
             // 이미 푼 문제는 채점 된 상태로 표시
             const gradedState = new Array(quizzes.length).fill(true);
             setIsGraded(gradedState);
          } else {
             setIsGraded(new Array(quizzes.length).fill(false));
          }
        }

      } catch (err) {
        console.error("Fetch Error:", err);
        Alert.alert("오류", "기사를 불러올 수 없습니다.");
        if (router.canGoBack()) router.back();
        else router.replace("/");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const handleMoveToQuiz = async () => {
      const token = await SecureStore.getItemAsync("accessToken");
      if (!token) {
          Alert.alert("로그인 필요", "퀴즈는 로그인 후 이용할 수 있습니다.", [
              { text: "취소", style: "cancel" },
              { text: "로그인", onPress: () => router.push("/(auth)/login") }
          ]);
          return;
      }
      setActiveTab("퀴즈");
  };

  // ✅ 정답 인덱스 추출 헬퍼 함수 (QuizTab과 동일한 로직)
  const getCorrectIndex = (quiz: any) => {
    return quiz.answerIndex !== undefined 
      ? Number(quiz.answerIndex) 
      : (parseInt(quiz.answer?.replace(/[^0-9]/g, "") || "0") - 1);
  };

  // ✅ 퀴즈 결과 서버 전송 함수
  const submitQuizResult = async (currentResults: boolean[]) => {
    try {
      const articleIdStr = Array.isArray(id) ? id[0] : id;
      console.log("📤 퀴즈 결과 전송:", currentResults);
      await apiClient.post("/api/quiz/result", { 
          articleId: articleIdStr, 
          results: currentResults 
      });
    } catch (error) { 
        console.error("퀴즈 저장 실패:", error); 
    }
  };

  // ✅ [핵심 수정] 채점 버튼 클릭 시 서버로 데이터 전송하도록 수정됨
  const handleGrade = (qIndex: number) => {
    if (isGraded[qIndex]) return;

    // 1. UI 상태 업데이트
    const updatedGraded = [...isGraded];
    updatedGraded[qIndex] = true;
    setIsGraded(updatedGraded);
    setIsOpen((prev: any) => ({ ...prev, [qIndex]: true }));

    // 2. 현재까지의 정답 여부 계산
    const gptData = article.gpt_result || article.gptResult || article.gptResults || article.GPTResult || {};
    const quizzes = article.quizzes || gptData.quizzes || [];
    
    // 전체 문제에 대한 O/X 배열 생성
    const results = quizzes.map((quiz: any, idx: number) => {
        const userAnswer = selected[idx];
        const correctAnswer = getCorrectIndex(quiz);
        // 아직 안 푼 문제는 false로 처리하거나, 현재 푼 문제까지만 계산
        return userAnswer === correctAnswer;
    });

    // 3. 서버로 전송 (하나만 풀어도 저장해서 오답노트에 남기기 위함)
    submitQuizResult(results);
  };

  if (loading) return (
    <View style={styles.center}><ActivityIndicator size="large" color="#007AFF" /></View>
  );

  if (!article) return null;

  const gptData = article.gpt_result || article.gptResult || article.gptResults || article.GPTResult || {};
  const keywordsData = gptData.keywords || article.keywords || [];
  const quizData = article.quizzes || gptData.quizzes || [];

  const renderContent = () => {
    switch (activeTab) {
      case "기사":
        return <ArticleTab article={article} onMoveToQuiz={handleMoveToQuiz} />;
      case "키워드":
        return <KeywordTab keywords={keywordsData} />;
      case "퀴즈":
        return (
          <QuizTab 
            quizList={quizData} 
            selected={selected} 
            isGraded={isGraded} 
            isOpen={isOpen}
            handleSelect={(q: number, o: number) => setSelected((prev: any) => ({ ...prev, [q]: o }))} 
            handleGrade={handleGrade} 
            toggleOpen={(qIndex: number) => setIsOpen((prev: any) => ({ ...prev, [qIndex]: !prev[qIndex] }))}
            myQuizResults={myQuizResults} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TabBar 
        activeTab={activeTab} 
        setActiveTab={(tab: string) => {
            if (tab === "퀴즈") handleMoveToQuiz();
            else setActiveTab(tab);
        }} 
        onBack={() => {
            if (router.canGoBack()) router.back();
            else router.replace("/");
        }} 
      />
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { flex: 1, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: "center", alignItems: "center" }
});