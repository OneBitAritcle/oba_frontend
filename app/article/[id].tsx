import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { apiClient } from "@/api/apiClient";

export default function ArticleDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // 퀴즈 상태
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [resultShown, setResultShown] = useState({});
  const [shuffledQuizzes, setShuffledQuizzes] = useState([]);

  async function loadDetail() {
    try {
      const res = await apiClient.get(`/articles/${id}`);
      const data = res.data;

      // 🔥 각 퀴즈 옵션 셔플 및 정답 재계산
      const quizWithShuffle = (data.quizzes ?? []).map((quiz) => {
        const indexed = quiz.options.map((opt, idx) => ({
          text: opt,
          originalIndex: idx,
        }));

        // shuffle
        for (let i = indexed.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
        }

        const newCorrectIndex = indexed.findIndex(
          (o) => o.originalIndex === quiz.answer
        );

        return {
          ...quiz,
          options: indexed.map((x) => x.text),
          correctIndex: newCorrectIndex,
        };
      });

      setShuffledQuizzes(quizWithShuffle);
      setArticle(data);
    } catch (err) {
      console.log("❌ 상세 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>불러오는 중...</Text>
      </View>
    );
  }

  if (!article) return <Text>데이터 없음</Text>;

  // ----------------------------
  // 🔥 본문(content) 파싱
  // ----------------------------
  let contentBlocks = [];
  try {
    const raw = article.content;
    if (typeof raw === "string") {
      contentBlocks = JSON.parse(raw);
    } else if (Array.isArray(raw)) {
      contentBlocks = raw;
    }
  } catch {
    contentBlocks = [];
  }

  const keywords = article.keywords ?? [];

  // ----------------------------
  // 🔥 답 선택 처리
  // ----------------------------
  const selectAnswer = (quizIndex, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [quizIndex]: optionIndex,
    }));

    // 정답 공개는 항상 활성화
    setResultShown((prev) => ({
      ...prev,
      [quizIndex]: true,
    }));
  };

  // ----------------------------
  // 🔙 뒤로가기
  // ----------------------------
  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)/");
  };

  return (
    <ScrollView style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity onPress={handleBack} style={styles.backWrapper}>
        <Text style={styles.backBtn}>← 뒤로가기</Text>
      </TouchableOpacity>

      {/* 제목 */}
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.date}>
        {article.publishTime} · {article.servingDate}
      </Text>

      {/* 요약 */}
      <Text style={styles.section}>요약</Text>
      <Text style={styles.text}>
        {article.summary ??
          (article.summaryBullets?.join("\n") ?? "요약 없음")}
      </Text>

      {/* 키워드 */}
      <Text style={styles.section}>키워드</Text>
      {keywords.map((kw, i) => (
        <Text key={i} style={styles.keyword}>
          • {kw}
        </Text>
      ))}

      {/* 본문 */}
      <Text style={styles.section}>본문</Text>
      {contentBlocks.map((block, i) => (
        <View key={i} style={{ marginBottom: 12 }}>
          {block.map((line, j) => (
            <Text key={j} style={styles.text}>
              {line.startsWith("<img>") ? "[이미지]" : line}
            </Text>
          ))}
        </View>
      ))}

      {/* 퀴즈 */}
      <Text style={styles.section}>퀴즈</Text>

      {shuffledQuizzes.map((quiz, qi) => {
        const userAnswer = selectedAnswers[qi];
        const correctIndex = quiz.correctIndex;
        const isAnswered = resultShown[qi];

        const isCorrect = userAnswer === correctIndex;

        return (
          <View key={qi} style={styles.quizBox}>
            <Text style={styles.quizQuestion}>
              Q{qi + 1}. {quiz.question}
            </Text>

            {quiz.options.map((opt, oi) => {
              let bgColor = "#f1f1f1";

              if (isAnswered) {
                if (isCorrect) {
                  // 정답 선택 → 정답만 초록
                  if (oi === correctIndex) bgColor = "#B5F7C2";
                } else {
                  // 오답 선택 → 선택한 보기만 빨강
                  if (oi === userAnswer) bgColor = "#FFBABA";
                }
              }

              return (
                <TouchableOpacity
                  key={oi}
                  onPress={() => selectAnswer(qi, oi)}
                  style={[styles.optionBtn, { backgroundColor: bgColor }]}
                >
                  <Text style={styles.optionText}>{oi + 1}. {opt}</Text>
                </TouchableOpacity>
              );
            })}

            {/* 정답/오답 메시지 */}
            {isAnswered &&
              (isCorrect ? (
                <View style={styles.answerBox}>
                  <Text style={styles.correctLabel}>정답입니다!</Text>
                  <Text style={styles.answerExplain}>{quiz.explanation}</Text>
                </View>
              ) : (
                <View style={styles.answerBox}>
                  <Text style={styles.wrongLabel}>틀렸습니다. 다시 선택 해주세요</Text>
                </View>
              ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },

  backWrapper: { marginBottom: 10 },
  backBtn: { fontSize: 18, color: "#007AFF", marginBottom: 10 },

  title: { fontSize: 26, fontWeight: "700", marginBottom: 6 },
  date: { color: "#777", marginBottom: 20 },

  section: { fontSize: 20, fontWeight: "700", marginTop: 22 },
  text: { fontSize: 15, lineHeight: 22, marginTop: 6 },
  keyword: { fontSize: 15, marginVertical: 4 },

  quizBox: {
    backgroundColor: "#fafafa",
    marginVertical: 16,
    padding: 18,
    borderRadius: 12,
  },

  quizQuestion: { fontSize: 17, fontWeight: "700", marginBottom: 10 },

  optionBtn: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  optionText: { fontSize: 15 },

  answerBox: { marginTop: 12 },
  correctLabel: { fontSize: 16, fontWeight: "700", color: "#0A7D20" },
  wrongLabel: { fontSize: 16, fontWeight: "700", color: "#D00000" },
  answerExplain: { fontSize: 14, marginTop: 4, color: "#444" },
});
